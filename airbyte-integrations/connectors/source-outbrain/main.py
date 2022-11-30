#
# Copyright (c) 2022 Airbyte, Inc., all rights reserved.
#


import sys

from airbyte_cdk.entrypoint import launch
from source_outbrain import SourceOutbrain

if __name__ == "__main__":
    source = SourceOutbrain()
    launch(source, sys.argv[1:])
