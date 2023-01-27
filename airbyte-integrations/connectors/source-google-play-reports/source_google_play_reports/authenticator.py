import base64
import datetime
import time
import requests

from typing import Any, List, Mapping
import logging

import jwt

class GooglePlay:

    # Google Endpoint for creating OAuth 2.0 Access Tokens from Signed-JWT
    auth_url = "https://www.googleapis.com/oauth2/v4/token"

    # Set how long this token will be valid in seconds
    expires_in = 3600   # Expires in 1 hour

    # Permissions to request for Access Token
    scopes = "https://www.googleapis.com/auth/cloud-platform"

    def __init__(
            self,
            **kwargs
        ):
            """
            Init API instance
            """
            self.__dict__.update(kwargs)

    def create_signed_jwt(self,pkey, pkey_id, email, scope):
        '''
        Create a Signed JWT from a service account Json credentials file
        This Signed JWT will later be exchanged for an Access Token
        '''

        issued = int(time.time())
        expires = issued + self.expires_in   # expires_in is in seconds

        # Note: this token expires and cannot be refreshed. The token must be recreated

        # JWT Headers
        additional_headers = {
                'kid': pkey_id,
                "alg": "RS256",
                "typ": "JWT"    # Google uses SHA256withRSA
        }

        # JWT Payload
        payload = {
            "iss": email,       # Issuer claim
            "sub": email,       # Issuer claim
            "aud": self.auth_url,    # Audience claim
            "iat": issued,      # Issued At claim
            "exp": expires,     # Expire time
            "scope": scope      # Permissions
        }

        # Encode the headers and payload and sign creating a Signed JWT (JWS)
        sig = jwt.encode(payload, pkey, algorithm="RS256", headers=additional_headers)

        return sig

    def exchangeJwtForAccessToken(self,signed_jwt):
        """
        This function takes a Signed JWT and exchanges it for a Google OAuth Access Token
        """

        params = {
            "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
            "assertion": signed_jwt
        }

        r = requests.post(self.auth_url, data=params)

        if r.ok:
            return(r.json()['access_token'], '')

        return None, r.text

    def set_api_headers(self, encoded_auth_string):
        headers = {"Authorization" : f"Basic {encoded_auth_string}"}

        response = requests.get(f"{self.api_url}/login", 
                headers=headers)

        return response.json()

    # check if the api token is valid
    def check_connection(self):

        s_jwt = self.create_signed_jwt(
        self.private_key,
        self.private_key_id,
        self.client_email,
        self.scopes)

        token, err = self.exchangeJwtForAccessToken(s_jwt)

        if token is not None:
            return True
        else:
            return False

        # response = requests.get(f"{self.api_url}/marketers",headers=self.api_headers)
        
        # if response.status_code==200:
        #     return True
        # else: 
        #     return False

class GooglePlayAuthenicator(GooglePlay):

    def __init__(self, auth_method: str = "Basic", auth_header: str = "Authorization",**kwargs):
        super().__init__(**kwargs)
            
    
    def get_auth_header(self) -> Mapping[str, Any]:

        s_jwt = self.create_signed_jwt(
        self.private_key,
        self.private_key_id,
        self.client_email,
        self.scopes)

        token, err = self.exchangeJwtForAccessToken(s_jwt)

        headers = {
            "Host": "www.googleapis.com",
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }

        return headers

    