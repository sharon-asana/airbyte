#
# Copyright (c) 2022 Airbyte, Inc., all rights reserved.
#


from abc import ABC
from distutils import core
from typing import Any, Iterable, List, Mapping, MutableMapping, Optional, Tuple

import requests
from airbyte_cdk.sources import AbstractSource
from airbyte_cdk.sources.streams import Stream
from airbyte_cdk.sources.streams.http import HttpStream
from airbyte_cdk.sources.streams.http.auth import BasicHttpAuthenticator
from airbyte_cdk.logger import AirbyteLogger

#connector specific imports
from requests.auth import HTTPBasicAuth
import re
from urllib.parse import urlparse

# Basic full refresh stream
class MauticStream(HttpStream, ABC):

    # TODO: Fill in the url base. Required.
    url_base = "https://example-api.com/v1/"

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

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:
        """
        TODO: Override this method to define how a response is parsed.
        :return an iterable containing each record in the response
        """
        yield {}


# Basic incremental stream
class IncrementalMauticStream(MauticStream, ABC):
    
    def __init__(self, limit: str, **kwargs):
        super().__init__(**kwargs)
        self.limit = limit

    # TODO: Fill in to checkpoint stream reads after N records. This prevents re-reading of data if the stream fails for any reason.
    state_checkpoint_interval = None

    # @property
    # def cursor_field(self) -> str:
    #     """
    #     TODO
    #     Override to return the cursor field used by this stream e.g: an API entity might always use created_at as the cursor field. This is
    #     usually id or date based. This field's presence tells the framework this in an incremental stream. Required for incremental.

    #     :return str: The name of the cursor field.
    #     """
    #     return "dateModified"

    # def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:
    #     """
    #     Override to determine the latest state after reading the latest record. This typically compared the cursor_field from the latest record and
    #     the current state and picks the 'most' recent cursor. This is how a stream's state is determined. Required for incremental.
    #     """
    #     state_value = max(current_stream_state.get(self.cursor_field, ""), latest_record.get(self.cursor_field, ""))
    #     return {self.cursor_field: state_value}

    # def request_params(
    #     self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None
    # ) -> MutableMapping[str, Any]:

    #     next_date = self.start_date
    #     if stream_state.get(self.cursor_field) is not None:
    #         next_date = stream_state.get(self.cursor_field)
        
    #     where = [
    #         # updated
    #         {
    #             'where[0][col]': 'dateModified',
    #             'where[0][expr]': 'gte',
    #             'where[0][val]': next_date,
    #         },
    #         #new users
    #         {
    #             'where[0][col]': 'dateAdded',
    #             'where[0][expr]': 'gte',
    #             'where[0][val]': next_date,
    #             'where[1][col]': 'dateModified',
    #             'where[1][expr]': 'isNull',
    #         }
    #     ]

    #     #where_clause = self.parse_where(where[0])
    #     params = {}
    #     params['limit'] = self.limit
    #     for key,val in where[0].items():
    #         params[key] = val
        
    #     return params

class Campaigns(MauticStream):

    primary_key = "id"
    limit = 10
    start = 0

    def __init__(self,url_base="",**kwargs):
        super().__init__(**kwargs)
        self.url_base = url_base

    def path(self, **kwargs) -> str:
        
        return "campaigns"

    def next_page_token(self, response: requests.Response) -> Optional[Mapping[str, Any]]:

        response_data = response.json()
        self.total_records = int(response_data["total"])
        
        if int(response_data["total"]) >= self.start:
            self.start+=self.limit
            return {"start": self.start}
        else:
            return None

    def request_params(self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, Any] = None, next_page_token: Mapping[str, Any] = None) -> MutableMapping[str, Any]:

        params = super().request_params(stream_state, stream_slice, next_page_token)

        if next_page_token:
            params.update(next_page_token)

        params['minimal'] = 'true'

        return params

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:
        """
        :return an iterable containing each record in the response
        """

        print(response.request.path_url)

        response_dict = []

        response_json = response.json()["campaigns"]

        for campaign in response_json:

            response_dict.append(response_json[campaign])

        yield from response_dict

class CampaignLeadEventLogStats(IncrementalMauticStream):

    cursor_field = "date_triggered"
    primary_key = "id"
    start = 0

    def __init__(self,start_date="",url_base="",**kwargs):
        super().__init__(**kwargs)
        self.url_base = url_base
        self.start_date = start_date
        self.limit = 10000

    def path(self, **kwargs) -> str:
        
        return "stats/campaign_lead_event_log"

    def next_page_token(self, response: requests.Response) -> Optional[Mapping[str, Any]]:

        response_data = response.json()
        self.total_records = int(response_data["total"])
        
        if int(response_data["total"]) >= self.start:
            self.start+=self.limit
            return {"start": self.start}
        else:
            return None

    def request_params(
        self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None
    ) -> MutableMapping[str, Any]:

        params = super().request_params(stream_state,stream_slice,next_page_token)
        
        if next_page_token:
            params.update(next_page_token)

        next_date = self.start_date
        if stream_state.get(self.cursor_field) is not None:
            next_date = stream_state.get(self.cursor_field)
        
        params["where[0][val]"] = next_date
        params["where[0][expr]"] = "gte"
        params["where[0][col]"] = self.cursor_field
        params["limit"] = self.limit
        params["orderBy"] = self.cursor_field
        params["orderByDir"] = "ASC"
        
        return params

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:
        """
        :return an iterable containing each record in the response
        """

        print(response.request.path_url)

        response_json = response.json()["stats"]

        yield from response_json

    def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:
        """
        Override to determine the latest state after reading the latest record. This typically compared the cursor_field from the latest record and
        the current state and picks the 'most' recent cursor. This is how a stream's state is determined. Required for incremental.
        """

        updated_state = max(current_stream_state.get(self.cursor_field, ""), latest_record.get(self.cursor_field, ""))

        return {self.cursor_field: updated_state}

class LeadDoNotContactStats(IncrementalMauticStream):

    cursor_field = "date_added"
    primary_key = "id"
    start = 0

    def __init__(self,start_date="",url_base="",**kwargs):
        super().__init__(**kwargs)
        self.url_base = url_base
        self.start_date = start_date
        self.limit = 10000

    def path(self, **kwargs) -> str:
        
        return "stats/lead_donotcontact"

    def next_page_token(self, response: requests.Response) -> Optional[Mapping[str, Any]]:

        response_data = response.json()
        self.total_records = int(response_data["total"])
        
        if int(response_data["total"]) >= self.start:
            self.start+=self.limit
            return {"start": self.start}
        else:
            return None

    def request_params(
        self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None
    ) -> MutableMapping[str, Any]:

        params = super().request_params(stream_state,stream_slice,next_page_token)
        
        if next_page_token:
            params.update(next_page_token)

        next_date = self.start_date
        if stream_state.get(self.cursor_field) is not None:
            next_date = stream_state.get(self.cursor_field)
        
        params["where[0][val]"] = next_date
        params["where[0][expr]"] = "gte"
        params["where[0][col]"] = self.cursor_field
        params["limit"] = self.limit
        params["orderBy"] = self.cursor_field
        params["orderByDir"] = "ASC"
        
        return params

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:
        """
        :return an iterable containing each record in the response
        """

        print(response.request.path_url)

        response_json = response.json()["stats"]

        yield from response_json

    def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:
        """
        Override to determine the latest state after reading the latest record. This typically compared the cursor_field from the latest record and
        the current state and picks the 'most' recent cursor. This is how a stream's state is determined. Required for incremental.
        """

        updated_state = max(current_stream_state.get(self.cursor_field, ""), latest_record.get(self.cursor_field, ""))

        return {self.cursor_field: updated_state}

class EmailStats(IncrementalMauticStream):

    cursor_field = "date_sent"
    alt_cursor_field = "date_read"
    primary_key = "id"
    start = 0
    alt_cursor_field_current_stream_value = ""

    def __init__(self,start_date="",url_base="",**kwargs):
        super().__init__(**kwargs)
        self.url_base = url_base
        self.start_date = start_date
        self.limit = 10000

    def path(self, **kwargs) -> str:
        
        return "stats/email_stats"

    def next_page_token(self, response: requests.Response) -> Optional[Mapping[str, Any]]:

        response_data = response.json()
        self.total_records = int(response_data["total"])
        
        if int(response_data["total"]) >= self.start:
            self.start+=self.limit
            return {"start": self.start}
        else:
            return None

    def stream_slices(self, cursor_field: List[str] = None, stream_state: Mapping[str, Any] = None, **kwargs) -> Iterable[Optional[Mapping[str, Any]]]:
        
        # the default start date comes from the user input
        next_date_read = self.start_date
        next_date_sent = self.start_date

        if stream_state.get(self.cursor_field) is not None:
            next_date_read = stream_state.get(self.cursor_field)
        if stream_state.get(self.alt_cursor_field) is not None:
            next_date_sent = stream_state.get(self.alt_cursor_field)

        slices = []
        
        where = [
            # date_sent
            {
                'where[0][col]': self.cursor_field,
                'where[0][expr]': 'gte',
                'where[0][val]': next_date_sent
            },
            # date_read
            {
                'where[0][col]': self.alt_cursor_field,
                'where[0][expr]': 'gte',
                'where[0][val]': next_date_read
            }
        ]

        for where_clause in where:
            where_clause_params = {}
            order_by_params = {}
            order_by_params["orderByDir"] = "ASC"
            for key,val in where_clause.items():
                where_clause_params[key] = val

                # it's super important to have the correct order for incremental load
                # because the state is coming from the stream and save the last row as the state
                # therefore we set the correct field in each slice to the orderBy
                if key == 'where[0][col]' and val == self.cursor_field:
                    order_by_params["orderBy"] = self.cursor_field
                if key == 'where[0][col]' and val == self.alt_cursor_field:
                    order_by_params["orderBy"] = self.alt_cursor_field
            merged_params = {**where_clause_params,**order_by_params}
            slices.append(merged_params)
            

        #return slices
        yield from slices

    def request_params(
        self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None
    ) -> MutableMapping[str, Any]:

        params = super().request_params(stream_state,stream_slice,next_page_token)

        params.update(stream_slice)
        
        if next_page_token:
            params.update(next_page_token)

        params["limit"] = self.limit

        # first iteration add the page number (there's no default in the API)
        if "page" not in params:
            params["page"] = 0

        print(params)
        
        return params

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:
        """
        :return an iterable containing each record in the response
        """

        print(response.request.path_url)

        response_json = response.json()["stats"]

        yield from response_json

    def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:
        """
        Override to determine the latest state after reading the latest record. This typically compared the cursor_field from the latest record and
        the current state and picks the 'most' recent cursor. This is how a stream's state is determined. Required for incremental.
        """

        # first iteration (current_stream_state is empty)
        if len(current_stream_state.keys()) > 0:
            # if the read_date is not empty, we'll save it to a class attribute
            if latest_record.get(self.alt_cursor_field, ""):
                date_read_max_value = max(current_stream_state.get(self.alt_cursor_field), latest_record.get(self.alt_cursor_field, "") or self.start_date)
                self.alt_cursor_field_current_stream_value = date_read_max_value
            
            date_sent_max_value = max(current_stream_state.get(self.cursor_field, ""), latest_record.get(self.cursor_field, ""))

            return {self.alt_cursor_field: self.alt_cursor_field_current_stream_value,self.cursor_field:date_sent_max_value}

        else:
            return {self.cursor_field:latest_record.get(self.cursor_field,""),self.alt_cursor_field:latest_record.get(self.alt_cursor_field,"")}
            

class PageHitStats(IncrementalMauticStream):

    cursor_field = "date_hit"
    primary_key = "id"
    start = 0

    def __init__(self,start_date="",url_base="",**kwargs):
        super().__init__(**kwargs)
        self.url_base = url_base
        self.start_date = start_date
        self.limit = 10000

    def path(self, **kwargs) -> str:
        
        return "stats/page_hits"

    def next_page_token(self, response: requests.Response) -> Optional[Mapping[str, Any]]:

        response_data = response.json()
        self.total_records = int(response_data["total"])
        
        if int(response_data["total"]) >= self.start:
            self.start+=self.limit
            return {"start": self.start}
        else:
            return None

    def request_params(
        self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None
    ) -> MutableMapping[str, Any]:

        params = super().request_params(stream_state,stream_slice,next_page_token)
        
        if next_page_token:
            params.update(next_page_token)

        next_date = self.start_date
        if stream_state.get(self.cursor_field) is not None:
            next_date = stream_state.get(self.cursor_field)
        
        params["where[0][val]"] = next_date
        params["where[0][expr]"] = "gte"
        params["where[0][col]"] = self.cursor_field
        params["limit"] = self.limit
        params["orderBy"] = self.cursor_field
        params["orderByDir"] = "ASC"

        # first iteration add the page number (there's not default in the API)
        if "page" not in params:
            params["page"] = 0
        
        return params

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:
        """
        :return an iterable containing each record in the response
        """

        print(response.request.path_url)

        response_json = response.json()["stats"]

        yield from response_json

    def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:
        """
        Override to determine the latest state after reading the latest record. This typically compared the cursor_field from the latest record and
        the current state and picks the 'most' recent cursor. This is how a stream's state is determined. Required for incremental.
        """

        updated_state = max(current_stream_state.get(self.cursor_field, ""), latest_record.get(self.cursor_field, ""))

        return {self.cursor_field: updated_state}

class EmailEvents(IncrementalMauticStream):

    cursor_field = "timestamp"
    primary_key = "eventId"
    page = 0
    include_events = 'email.read,email.sent,email.replied,email.failed'

    def __init__(self,start_date="",url_base="",**kwargs):
        super().__init__(**kwargs)
        self.url_base = url_base
        self.start_date = start_date
        self.limit = 10000

    def path(self, **kwargs) -> str:
        
        return "contacts/activity"

    def next_page_token(self, response: requests.Response) -> Optional[Mapping[str, Any]]:
        response_data = response.json()
        self.total_records = int(response_data["total"])
        
        if int(response_data["maxPages"]) > int(response_data["page"]):
            self.page+=1
            return {"page": self.page}
        else:
            return None

    def request_params(
        self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None
    ) -> MutableMapping[str, Any]:

        params = super().request_params(stream_state,stream_slice,next_page_token)
        
        if next_page_token:
            params.update(next_page_token)

        next_date = self.start_date
        if stream_state.get(self.cursor_field) is not None:
            next_date = stream_state.get(self.cursor_field)
        
        params["filters[dateFrom]"] = next_date
        params["limit"] = self.limit
        params["orderBy"] = self.cursor_field
        params["orderByDir"] = "ASC"

        # add events to include (take only email events)
        i=0
        for event in self.include_events.split(","):
            params[f"filters[includeEvents][{i}]"] = event
            i+=1

        # first iteration add the page number (there's not default in the API)
        if "page" not in params:
            params["page"] = 0
        
        return params

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:
        """
        :return an iterable containing each record in the response
        """

        print(response.request.path_url)

        response_json = response.json()["events"]

        yield from response_json

    def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:
        """
        Override to determine the latest state after reading the latest record. This typically compared the cursor_field from the latest record and
        the current state and picks the 'most' recent cursor. This is how a stream's state is determined. Required for incremental.
        """

        updated_state = max(current_stream_state.get(self.cursor_field, ""), latest_record.get(self.cursor_field, ""))

        return {self.cursor_field: updated_state}

class DoNotContactEvents(IncrementalMauticStream):

    cursor_field = "timestamp"
    primary_key = "eventId"
    page = 0
    include_events = 'lead.donotcontact'

    def __init__(self,start_date="",url_base="",**kwargs):
        super().__init__(**kwargs)
        self.url_base = url_base
        self.start_date = start_date
        self.limit = 2000

    def path(self, **kwargs) -> str:
        
        return "contacts/activity"

    def next_page_token(self, response: requests.Response) -> Optional[Mapping[str, Any]]:
        response_data = response.json()
        self.total_records = int(response_data["total"])
        
        if int(response_data["maxPages"]) > int(response_data["page"]):
            self.page+=1
            return {"page": self.page}
        else:
            return None

    def request_params(
        self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None
    ) -> MutableMapping[str, Any]:

        params = super().request_params(stream_state,stream_slice,next_page_token)
        
        if next_page_token:
            params.update(next_page_token)

        next_date = self.start_date
        if stream_state.get(self.cursor_field) is not None:
            next_date = stream_state.get(self.cursor_field)
        
        params["filters[dateFrom]"] = next_date
        params["limit"] = self.limit
        params["orderBy"] = self.cursor_field
        params["orderByDir"] = "ASC"

        # add events to include
        i=0
        for event in self.include_events.split(","):
            print(event)
            params[f"filters[includeEvents][{i}]"] = event
            i+=1

        # first iteration add the page number (there's not default in the API)
        if "page" not in params:
            params["page"] = 0
        
        return params

    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:
        """
        :return an iterable containing each record in the response
        """

        print(response.request.path_url)

        response_json = response.json()["events"]

        yield from response_json

    def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:
        """
        Override to determine the latest state after reading the latest record. This typically compared the cursor_field from the latest record and
        the current state and picks the 'most' recent cursor. This is how a stream's state is determined. Required for incremental.
        """

        updated_state = max(current_stream_state.get(self.cursor_field, ""), latest_record.get(self.cursor_field, ""))

        return {self.cursor_field: updated_state}

class Contacts(IncrementalMauticStream):

    cursor_field = "dateAdded"
    alt_cursor_field = "dateModified"
    primary_key = "id"
    total_records = 0
    records_count = 0
    start = 0
    alt_cursor_field_current_stream_value = ""

    def __init__(self,start_date="",url_base="",**kwargs):
        super().__init__(**kwargs)
        self.url_base = url_base
        self.start_date = start_date
        self.limit = 1000

    def path(self, **kwargs) -> str:
        
        return "contacts"

    def next_page_token(self, response: requests.Response) -> Optional[Mapping[str, Any]]:
        response_data = response.json()
        self.total_records = int(response_data["total"])
        
        if int(response_data["total"]) >= self.start:
            self.start+=self.limit
            return {"start": self.start}
        else:
            return None

    def stream_slices(self, cursor_field: List[str] = None, stream_state: Mapping[str, Any] = None, **kwargs) -> Iterable[Optional[Mapping[str, Any]]]:
        
        next_dateModified = self.start_date
        next_dateAdded = self.start_date
        alt_cursor_field_snake_case = re.sub(r'(?<!^)(?=[A-Z])', '_', self.alt_cursor_field).lower()
        cursor_field_snake_case = re.sub(r'(?<!^)(?=[A-Z])', '_', self.cursor_field).lower()

        if stream_state.get(self.cursor_field) is not None:
            next_dateAdded = stream_state.get(self.cursor_field)
        if stream_state.get(self.alt_cursor_field) is not None:
            next_dateModified = stream_state.get(self.alt_cursor_field)

        slices = []
        
        where = [
            # updated
            {
                'where[0][col]': 'dateModified',
                'where[0][expr]': 'gte',
                'where[0][val]': next_dateModified,
            },
            #new users
            {
                'where[0][col]': 'dateAdded',
                'where[0][expr]': 'gte',
                'where[0][val]': next_dateAdded,
                'where[1][col]': 'dateModified',
                'where[1][expr]': 'isNull',
            }
        ]

        for where_clause in where:
            where_clause_params = {}
            order_by_params = {}
            order_by_params["orderByDir"] = "ASC"
            for key,val in where_clause.items():
                where_clause_params[key] = val

                # it's super important to have the correct order for incremental load
                # because the state is coming from the stream and save the last row as the state
                # therefore we set the correct field in each slice to the orderBy
                if key == 'where[0][col]' and val == 'dateModified':
                    order_by_params["orderBy"] = alt_cursor_field_snake_case
                if key == 'where[0][col]' and val == 'dateAdded':
                    order_by_params["orderBy"] = cursor_field_snake_case
            merged_params = {**where_clause_params,**order_by_params}
            #merged_params['limit'] = self.limit
            slices.append(merged_params)
            

        #return slices

        print(slices)
        yield from slices

    def request_params(
        self, stream_state: Mapping[str, Any], stream_slice: Mapping[str, any] = None, next_page_token: Mapping[str, Any] = None
    ) -> MutableMapping[str, Any]:

        params = super().request_params(stream_state,stream_slice,next_page_token)

        params.update(stream_slice)
        
        if next_page_token:
            params.update(next_page_token)

        params['limit'] = self.limit
        
        return params


    def parse_response(self, response: requests.Response, **kwargs) -> Iterable[Mapping]:
        """
        :return an iterable containing each record in the response
        """

        url = response.request.path_url
        

        response_json = response.json()
        if not "start" in url:
            print("Total records: ",response_json["total"])
        response_dict = []
        for contact in response_json['contacts']:
            data = {}
            custom_fields = {}
            fields = response_json['contacts'][contact]['fields']
            base_fields = response_json['contacts'][contact]
            for field in base_fields:
                if field != 'fields':
                    data[field] = base_fields[field]
            
            # add custom fields as a json
            for field_name in fields['core']:
                if fields['core'][field_name]['is_fixed'] == '0':
                    custom_fields[field_name] = fields['core'][field_name]['value']
            
            data['custom_fields'] = custom_fields

            # add updated_at
            data['updated_at'] = max(data['dateAdded'],data['dateModified'] or '1970-01-01 00:00:00')
            response_dict.append(data)
        
        yield from response_dict

    def get_updated_state(self, current_stream_state: MutableMapping[str, Any], latest_record: Mapping[str, Any]) -> Mapping[str, Any]:
        """
        Override to determine the latest state after reading the latest record. This typically compared the cursor_field from the latest record and
        the current state and picks the 'most' recent cursor. This is how a stream's state is determined. Required for incremental.
        """

        # first iteration (current_stream_state is empty)
        if len(current_stream_state.keys()) > 0:
            # if the dateModified is not empty, we'll save it to a class attribute
            if latest_record.get(self.alt_cursor_field, ""):
                dateModified_max_value = max(current_stream_state.get(self.alt_cursor_field), latest_record.get(self.alt_cursor_field, "") or self.start_date)
                self.alt_cursor_field_current_stream_value = dateModified_max_value
            
            dateAdded_max_value = max(current_stream_state.get(self.cursor_field, ""), latest_record.get(self.cursor_field, ""))

            return {self.alt_cursor_field: self.alt_cursor_field_current_stream_value,self.cursor_field:dateAdded_max_value}

        else:
            return {self.cursor_field:latest_record.get(self.cursor_field,""),self.alt_cursor_field:latest_record.get(self.alt_cursor_field,"")}


# Source
class SourceMautic(AbstractSource):
    def check_connection(self, logger, config) -> Tuple[bool, any]:
        """
        A connection check to validate that the user-provided config can be used to connect to the underlying API

        :param config:  the user-input config object conforming to the connector's spec.yaml
        :param logger:  logger object
        :return Tuple[bool, any]: (True, None) if the input config can be used to connect to the API successfully, (False, error) otherwise.
        """
        logger.info("Checking Mautic API connection...")
        try:
            host = config["host"].strip(' /')
            username = config["username"]
            password = config["password"]
            response = requests.get(
                f"{host}/users/self", auth=HTTPBasicAuth(username=username, password=password)
            )
            if response.status_code == 200:
                return True, None
            else:
                return False, "Invalid Mautic API credentials, make sure that your user has API access"
        except Exception as e:
            return False, e

    def streams(self, config: Mapping[str, Any]) -> List[Stream]:
        """
        :param config: A Mapping of the user input configuration as defined in the connector spec.
        """
        auth = BasicHttpAuthenticator(username=config["username"], password=config["password"])
        url_base = f'{config["host"].strip(" /")}/api'
        args = {"limit": 2000}
        return [
                Contacts(authenticator=auth,start_date=config['start_date'],url_base=url_base,**args),
                EmailEvents(authenticator=auth,start_date=config['start_date'],url_base=url_base,**args),
                PageHitStats(authenticator=auth,start_date=config['start_date'],url_base=url_base,**args),
                EmailStats(authenticator=auth,start_date=config['start_date'],url_base=url_base,**args),
                DoNotContactEvents(authenticator=auth,start_date=config['start_date'],url_base=url_base,**args),
                Campaigns(authenticator=auth,url_base=url_base),
                LeadDoNotContactStats(authenticator=auth,start_date=config['start_date'],url_base=url_base,**args),
                CampaignLeadEventLogStats(authenticator=auth,start_date=config['start_date'],url_base=url_base,**args)]
