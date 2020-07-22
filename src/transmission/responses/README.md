# puddle.transmission.responses
This directory contains a bunch of type definitions for responses from the
transmission daemon. These exist to make development easier, there're no runtime
guarantees that the responses will actually conform to these types and some may in
fact be missing depending on your transmission version. For most compatibility, use a
transmission version compatible with the same one as puddle.

Also NOTE that tsserver seems to have
[issues](https://github.com/Microsoft/TypeScript/issues/4032) with assuming the type
of a hyphenated property.
