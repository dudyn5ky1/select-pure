#!/bin/sh

codecov -t $(grep CODECOV_TOKEN .env | cut -d '=' -f2)
