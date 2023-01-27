#
# Copyright (c) 2022 Airbyte, Inc., all rights reserved.
#


from abc import ABC
from typing import Any, Iterable, List, Mapping, MutableMapping, Optional, Tuple, Union

import requests
from airbyte_cdk.sources import AbstractSource
from airbyte_cdk.sources.streams import Stream
from airbyte_cdk.sources.streams.http import HttpStream
from airbyte_cdk.sources.streams.http.auth import TokenAuthenticator

from .authenticator import GooglePlayAuthenicator
import urllib
import io
import zipfile
import re
from datetime import datetime
import csv

"""
TODO: Most comments in this class are instructive and should be deleted after the source is implemented.

This file provides a stubbed example of how to use the Airbyte CDK to develop both a source connector which supports full refresh or and an
incremental syncs from an HTTP API.

The various TODOs are both implementation hints and steps - fulfilling all the TODOs should be sufficient to implement one basic and one incremental
stream from a source. This pattern is the same one used by Airbyte internally to implement connectors.

The approach here is not authoritative, and devs are free to use their own judgement.

There are additional required TODOs in the files within the integration_tests folder and the spec.yaml file.
"""


# Basic full refresh stream
class GooglePlayReportsStream(HttpStream, ABC):
    """
    TODO remove this comment

    This class represents a stream output by the connector.
    This is an abstract base class meant to contain all the common functionality at the API level e.g: the API base URL, pagination strategy,
    parsing responses etc..

    Each stream should extend this class (or another abstract subclass of it) to specify behavior unique to that stream.

    Typically for REST APIs each stream corresponds to a resource in the API. For example if the API
    contains the endpoints
        - GET v1/customers
        - GET v1/employees

    then you should have three classes:
    `class GooglePlayReportsStream(HttpStream, ABC)` which is the current class
    `class Customers(GooglePlayReportsStream)` contains behavior to pull data for customers using v1/customers
    `class Employees(GooglePlayReportsStream)` contains behavior to pull data for employees using v1/employees

    If some streams implement incremental sync, it is typical to create another class
    `class IncrementalGooglePlayReportsStream((GooglePlayReportsStream), ABC)` then have concrete stream implementations extend it. An example
    is provided below.

    See the reference docs for the full list of configurable options.
    """

    # TODO: Fill in the url base. Required.        
    url_base = "https://www.googleapis.com/storage/v1/b/{0}/o" 


    def next_page_token(self, response: requests.Response) -> Optional[Mapping[str, Any]]:
        """
        TODO: Override this method to define a pagination strategy. If you will not be using pagination, no action is required - just return None.

        This method should return a Mapping (e.g: dict) containing whatever information required to make paginated requests. This dict is passed
        to most other methods in this class to help you form headers, request bodies, query params, etc..

        For example, if the API accepts a 'page' parameter to determine which page of the result to return, and a response from the API contains a
        'page' number, then this method should probably return a dict {'page': response.json()['page'] + 1} to increment the page count by 1.
        The request_params method should then read the input next_page_token and set the 'page' param to next_page_token['page'].

        :param response: the most recent response from the API
        :return If there is another page in the result, a mapping (e.g: dict) containing information needed to query the next page in the response.
                If there are no more pages in the result, return None.
        """
        return None

    def request_params(
        self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None
    ) -> MutableMapping[str, Any]:
        """
        TODO: Override this method to define any query parameters to be set. Remove this method if you don't need to define request params.
        Usually contains common params e.g. pagination size etc.
        """
        return {}

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:
        """
        TODO: Override this method to define how a response is parsed.
        :return an iterable containing each record in the response
        """
        yield {}


class Customers(GooglePlayReportsStream):
    """
    TODO: Change class name to match the table/data source this stream corresponds to.
    """

    # TODO: Fill in the primary key. Required. This is usually a unique field in the stream, like an ID or a timestamp.
    primary_key = "customer_id"

    def path(
        self, stream_state: Mapping[str, Any] = None, stream_slice: Mapping[str, Any] = None, next_page_token: Mapping[str, Any] = None
    ) -> str:
        """
        TODO: Override this method to define the path this stream corresponds to. E.g. if the url is https://example-api.com/v1/customers then this
        should return "customers". Required.
        """
        return "customers"


# Basic incremental stream
class IncrementalGooglePlayReportsStream(GooglePlayReportsStream, ABC):
    """
    TODO fill in details of this class to implement functionality related to incremental syncs for your connector.
         if you do not need to implement incremental sync for any streams, remove this class.
    """

    # TODO: Fill in to checkpoint stream reads after N records. This prevents re-reading of data if the stream fails for any reason.
    state_checkpoint_interval = None

    @property
    def cursor_field(self) -> str:
        """
        TODO
        Override to return the cursor field used by this stream e.g: an API entity might always use created_at as the cursor field. This is
        usually id or date based. This field's presence tells the framework this in an incremental stream. Required for incremental.

        :return str: The name of the cursor field.
        """
        return []

    def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:
        """
        Override to determine the latest state after reading the latest record. This typically compared the cursor_field from the latest record and
        the current state and picks the 'most' recent cursor. This is how a stream's state is determined. Required for incremental.
        """
        return {}


class Sales(IncrementalGooglePlayReportsStream):

    cursor_field = "order_charged_date"
    bucket_name = ""

    def __init__(self, authenticator,bucket_name=""):
        self.bucket_name=bucket_name
        super().__init__(authenticator)
    
    @property
    def url_base(self) -> str:
        url = super().url_base.format(self.bucket_name)
        return url

    @property
    def primary_key(self) -> Optional[Union[str, List[str], List[List[str]]]]:
        """Build complex PK"""
        return ["order_number", "financial_status", "order_charged_timestamp"]

    def request_headers(self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, Any] = None, next_page_token: Mapping[str, Any] = None) -> Mapping[str, Any]:

        headers = super().request_headers(stream_state, stream_slice, next_page_token)
        headers['Content-Type'] = stream_slice['type']

        return headers

    def request_params(self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None) -> MutableMapping[str, Any]:

        params = super().request_params(stream_state, stream_slice, next_page_token)
        params['alt'] = 'media'

        return params

    def path(self,stream_slice, **kwargs) -> str:
        
        object_name = urllib.parse.quote_plus(stream_slice['name'])
        if stream_slice:
            return f"o/{object_name}"
        else:
            return "?prefix=sales"

    def stream_slices(self, stream_state: Mapping[str, Any] = None, **kwargs) -> Iterable[Optional[Mapping[str, any]]]:

        # list all object in the GCP backet
        response = requests.get(url=f'{self.url_base}/?prefix={self.name}',headers=self.authenticator.get_auth_header()).json()

        for object_item in response['items']:
            # if there's a state then take only files with a later date
            if stream_state:
                file_year_month_string = re.match('sales\/salesreport_(\d+)\.zip',object_item['name']).group(1)
                file_year_month = datetime.strptime(file_year_month_string,'%Y%m')
                state_year_month = datetime.strptime(stream_state[self.cursor_field][:7],'%Y-%m')
                if file_year_month >= state_year_month:
                    yield {"name":object_item['name'],"type":object_item['contentType']}
            # if there's no state then take all files
            else:
                yield {"name":object_item['name'],"type":object_item['contentType']}

    def unzip_in_memory(self,content):
        
        with zipfile.ZipFile(io.BytesIO(content)) as zip_file:
            for file_name in zip_file.namelist():
                data = zip_file.read(file_name).decode('utf-8')
                yield data

    def get_fields_from_schema(self,field_type=""):

        schema = self.get_json_schema()
        fields = []
        for prop,type in schema['properties'].items():
            if field_type in type['type']:
                fields.append(prop)
        return fields

    # convert a comma delimited string to a dictionary using the first row as the header
    def csv_to_dict(self,csv_data: list):

        out = [dict(zip(csv_data[0].lower().replace(' ','_').split(','), list(csv.reader([row], delimiter=',', quotechar='"'))[0])) for row in csv_data[1:]]

        # get number fields from schema
        numeric_fields = self.get_fields_from_schema(field_type='number')
        # remove comma from numeric value
        for data in out:
            for key, value in data.items():
                if key in numeric_fields:
                    data[key] = value.replace(',','')

        return out

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:

        results = {}
        # unzip in memory and delete the first row (csv file header)
        res = self.unzip_in_memory(response.content)
        for file_data in res:
            data = []
            for row in file_data.split('\n'):
                if len(row) > 0:
                    data.append(row)
            results = self.csv_to_dict(data)
            yield from results
    
    def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:

        latest = max(current_stream_state.get(self.cursor_field, ""), latest_record.get(self.cursor_field, ""))

        return {self.cursor_field:latest}

class Earnings(IncrementalGooglePlayReportsStream):

    cursor_field = "transaction_date"
    bucket_name = ""

    def __init__(self, authenticator,bucket_name=""):
        self.bucket_name=bucket_name
        super().__init__(authenticator)
    
    @property
    def url_base(self) -> str:
        url = super().url_base.format(self.bucket_name)
        return url

    @property
    def primary_key(self) -> Optional[Union[str, List[str], List[List[str]]]]:
        """Build complex PK"""
        return ["description", "transaction_date", "transaction_type","tax_type","amount_buyer_currency"]

    def request_headers(self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, Any] = None, next_page_token: Mapping[str, Any] = None) -> Mapping[str, Any]:

        headers = super().request_headers(stream_state, stream_slice, next_page_token)
        headers['Content-Type'] = stream_slice['type']

        return headers

    def request_params(self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None) -> MutableMapping[str, Any]:

        params = super().request_params(stream_state, stream_slice, next_page_token)
        params['alt'] = 'media'

        return params

    def path(self,stream_slice, **kwargs) -> str:
        
        object_name = urllib.parse.quote_plus(stream_slice['name'])
        if stream_slice:
            return f"o/{object_name}"
        else:
            return "?prefix=earnings"

    def stream_slices(self, stream_state: Mapping[str, Any] = None, **kwargs) -> Iterable[Optional[Mapping[str, any]]]:

        # list all object in the GCP backet
        response = requests.get(url=f'{self.url_base}/?prefix={self.name}',headers=self.authenticator.get_auth_header()).json()

        for object_item in response['items']:
            # if there's a state then take only files with a later date
            if stream_state:
                file_year_month_string = re.match('earnings\/earnings_(\d+).+\.zip',object_item['name']).group(1)
                file_year_month = datetime.strptime(file_year_month_string,'%Y%m')
                state_year_month = datetime.strptime(stream_state[self.cursor_field][:7],'%Y-%m')
                if file_year_month >= state_year_month:
                    yield {"name":object_item['name'],"type":object_item['contentType']}
            # if there's no state then take all files
            else:
                yield {"name":object_item['name'],"type":object_item['contentType']}

    def unzip_in_memory(self,content):
        
        with zipfile.ZipFile(io.BytesIO(content)) as zip_file:
            for file_name in zip_file.namelist():
                data = zip_file.read(file_name).decode('utf-8')
                yield data

    def get_fields_from_schema(self,field_type=""):

        schema = self.get_json_schema()
        fields = []
        for prop,type in schema['properties'].items():
            if field_type in type['type']:
                fields.append(prop)
        return fields

    # convert a comma delimited string to a dictionary using the first row as the header
    def csv_to_dict(self,csv_data: list):

        file_header = csv_data[0].lower().replace(' ','_').replace('(','').replace(')','').split(',')
        out = [dict(zip(file_header, list(csv.reader([row], delimiter=',', quotechar='"'))[0])) for row in csv_data[1:]]

        # get number fields from schema
        numeric_fields = self.get_fields_from_schema(field_type='number')
        # remove comma from numeric value
        for data in out:
            for key, value in data.items():
                if key in numeric_fields:
                    data[key] = value.replace(',','')

        return out

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:

        results = {}
        # unzip in memory and delete the first row (csv file header)
        res = self.unzip_in_memory(response.content)
        for file_data in res:
            data = []
            for row in file_data.split('\n'):
                if len(row) > 0:
                    data.append(row)
            results = self.csv_to_dict(data)

            # convert the transaction date to a readable date format
            for row in results:
                for key,value in row.items():
                    if key=='transaction_date':
                        row[key] = datetime.strptime(value, "%b %d, %Y").strftime('%Y-%m-%d') 
            yield from results
    
    def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:

        latest = max(current_stream_state.get(self.cursor_field, ""), latest_record.get(self.cursor_field, ""))

        return {self.cursor_field:latest}

# Source
class SourceGooglePlayReports(AbstractSource):
    def check_connection(self, logger, config) -> Tuple[bool, any]:
        
        auth = GooglePlayAuthenicator(**config)

        if auth.check_connection():
            return True, None
        else:
            return False, None

    def streams(self, config: Mapping[str, Any]) -> List[Stream]:
        
        auth = GooglePlayAuthenicator(**config)
        return [Sales(authenticator=auth,bucket_name=config['bucket_name']), 
            Earnings(authenticator=auth,bucket_name=config['bucket_name'])
        ]
