import base64
import datetime
import time
import requests

from typing import Any, List, Mapping
import logging

import boto3

class Outbrain:

    aws_secret_name = 'AIRBYTE_OUTBRAIN_TOKEN'

    def __init__(
            self,
            **kwargs
        ):
            """
            Init API instance
            """
            self.__dict__.update(kwargs)

    def set_api_headers(self, encoded_auth_string):
        headers = {"Authorization" : f"Basic {encoded_auth_string}"}

        response = requests.get(f"{self.api_url}/login", 
                headers=headers)

        self.set_or_create_aws_secret(response.json()["OB-TOKEN-V1"])

        return response.json()

    def get_aws_connection(self):

        ssm = boto3.client('ssm', aws_access_key_id=self.aws_access_key_id, aws_secret_access_key=self.aws_secret_access_key,
                      region_name=self.aws_region)

        return ssm

    def get_token_from_aws_secrets(self):

        ssm = self.get_aws_connection()

        try: 
            response = ssm.get_parameter(
                Name=self.aws_secret_name
            )   
            return response['Parameter']['Value']
        except:
            return None

    def set_or_create_aws_secret(self,token: str):

        ssm = self.get_aws_connection()

        ssm.put_parameter(
            Name=self.aws_secret_name,
            Value=token,
            Type="String",
            Overwrite=True
        )

        return True

    # check if the api token is valid
    def check_connection(self):

        response = requests.get(f"{self.api_url}/marketers",headers=self.api_headers)

        if response.status_code==200:
            return True
        else: 
            return False

class OutbrainAuthenicator(Outbrain):

    api_url = "https://api.outbrain.com/amplify/v0.1"

    def __init__(self, auth_method: str = "Basic", auth_header: str = "Authorization",**kwargs):
        super().__init__(**kwargs)
        auth_string = f"{self.username}:{self.password}".encode("utf8")
        b64_encoded = base64.b64encode(auth_string).decode("utf8")
        
        token = self.get_token_from_aws_secrets()
        if token:
            self.api_headers = {}
            self.api_headers["OB-TOKEN-V1"] = token

            # check if the api token is valid
            if self.check_connection():
                logging.info("API Token is valid")
            else:
                self.api_headers = self.set_api_headers(b64_encoded)
        else:
            self.api_headers = self.set_api_headers(b64_encoded)
            
    
    def get_auth_header(self) -> Mapping[str, Any]:
        return self.api_headers
