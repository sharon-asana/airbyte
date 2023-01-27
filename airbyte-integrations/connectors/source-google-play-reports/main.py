#
# Copyright (c) 2022 Airbyte, Inc., all rights reserved.
#


import sys

from airbyte_cdk.entrypoint import launch
from source_google_play_reports import SourceGooglePlayReports

if __name__ == "__main__":
    source = SourceGooglePlayReports()
    launch(source, sys.argv[1:])
