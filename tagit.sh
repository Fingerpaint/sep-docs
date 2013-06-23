#!/bin/bash

BASENAME=`basename $0`
BASENAME=${BASENAME%/*}

if [ $# -lt 3 ] ; then
	echo "Usage: $BASENAME document version sha1-id"
	exit 1
fi

DOCUMENT="$1"
VERSION="$2"
COMMIT="$3"

git tag -a "$DOCUMENT-$VERSION" -m "Version $DOCUMENT-$VERSION: the version of the documentation as it is when the $DOCUMENT is at version $VERSION." $COMMIT
