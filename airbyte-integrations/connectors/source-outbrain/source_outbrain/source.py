#
# Copyright (c) 2022 Airbyte, Inc., all rights reserved.
#


from abc import ABC
from typing import Any, Iterable, List, Mapping, MutableMapping, Optional, Tuple

import requests
from airbyte_cdk.sources import AbstractSource
from airbyte_cdk.sources.streams import Stream
from airbyte_cdk.sources.streams.http import HttpStream
#from airbyte_cdk.sources.streams.http.auth import TokenAuthenticator,BasicHttpAuthenticator

from .authenticator import OutbrainAuthenicator
from datetime import datetime,timedelta
import hashlib

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
class OutbrainStream(HttpStream, ABC):
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
    `class OutbrainStream(HttpStream, ABC)` which is the current class
    `class Customers(OutbrainStream)` contains behavior to pull data for customers using v1/customers
    `class Employees(OutbrainStream)` contains behavior to pull data for employees using v1/employees

    If some streams implement incremental sync, it is typical to create another class
    `class IncrementalOutbrainStream((OutbrainStream), ABC)` then have concrete stream implementations extend it. An example
    is provided below.

    See the reference docs for the full list of configurable options.
    """

    url_base = "https://api.outbrain.com/amplify/v0.1/"

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


class Customers(OutbrainStream):
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
class IncrementalOutbrainStream(OutbrainStream, ABC):
    
    def __init__(self, limit: str, **kwargs):
        super().__init__(**kwargs)
        self.limit = limit

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

# API documentation 
# https://amplifyv01.docs.apiary.io/#reference/performance-reporting/campaigns/retrieve-campaigns-with-performance-statistics-for-a-marketer
class Campaigns(IncrementalOutbrainStream):
    
    cursor_field = "start_date"
    primary_key = "primary_key"
    limit = 10
    start = 0

    def __init__(self,start_date="",**kwargs):
        super().__init__(**kwargs)
        self.start_date = start_date

    def path(self,stream_slice: Mapping[str, Any] = None, **kwargs) -> str:
        
        return f"reports/marketers/{stream_slice['marketerId']}/campaigns"

    def get_marketers(self):

        auth_headers = self.authenticator.get_auth_header()
        response = requests.get(f"{self.url_base}/marketers",headers=auth_headers)
        
        for marketer in response.json()["marketers"]:
            yield {'marketerId':marketer['id']}

    def stream_slices(self, stream_state: Mapping[str, Any] = None, **kwargs) -> Iterable[Optional[Mapping[str, any]]]:

        marketers = self.get_marketers()

        if stream_state:
            self.start_date = stream_state['start_date']

        start = datetime.strptime(self.start_date,'%Y-%m-%d')
        end = datetime.today()
        daterange = [start + timedelta(days=x) for x in range(0, (end-start).days)]

        for marketer in marketers:
            for _date in daterange:
                yield {'marketerId':marketer['marketerId'],'from':_date.strftime('%Y-%m-%d'),'to':_date.strftime('%Y-%m-%d'),'limit':self.limit}

    def request_params(self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None) -> MutableMapping[str, Any]:

        params = {}
        params.update(stream_slice)
        if next_page_token:
            params.update(next_page_token)

        return params

    def flatteningJSON(self,b): 
        ans = {} 
        def flat(i, na =''):
            #nested key-value pair: dict type
            if type(i) is dict: 
                for a in i: 
                    flat(i[a], na + a + '_')
            #nested key-value pair: list type
            # elif type(i) is list: 
            #     j = 0  
            #     for a in i:                 
            #         flat(a, na + str(j) + '_') 
            #         j += 1
            else: 
                ans[na[:-1]] = i 
        flat(b) 
        return ans

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:

        res = response.json()

        cursor = kwargs['stream_slice']['from']

        results = []

        for row in res["results"]:
            result_set = {}
            flatten = self.flatteningJSON(row)
            pkey = hashlib.sha1(str(cursor+row['metadata']['id']).encode('utf-8')).hexdigest()
            result_set.update(flatten)
            result_set[self.primary_key] = pkey
            result_set[self.cursor_field] = cursor
            results.append(result_set)
        
        return results

    def next_page_token(self, response: requests.Response) -> Optional[Mapping[str, Any]]:

        response_data = response.json()
        self.total_records = int(response_data["totalResults"])
        if (self.start+self.limit) >= response_data["totalResults"]:
            return None
        else:
            self.start+=self.limit
            return {"offset": self.start}

    def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:

        latest = max(current_stream_state.get(self.cursor_field, ""), latest_record.get(self.cursor_field, ""))

        return {self.cursor_field:latest}


# Source
class SourceOutbrain(AbstractSource):
    def check_connection(self, logger, config) -> Tuple[bool, any]:
        
        auth = OutbrainAuthenicator(**config)

        if auth.check_connection():
            return True, None
        else:
            return False, None

    def streams(self, config: Mapping[str, Any]) -> List[Stream]:
        
        auth = OutbrainAuthenicator(**config)
        args = {"limit": 1}
        return [Campaigns(authenticator=auth,start_date=config["start_date"],**args)]
