\echo 'Delete and recreate yearone_takehome db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS yearone_takehome;
CREATE DATABASE yearone_takehome;
\connect yearone_takehome;
\i yearone-schema.sql

\echo 'Delete and recreate yearone_takehome_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS yearone_takehome_test;
CREATE DATABASE yearone_takehome_test;
\connect yearone_takehome_test;
\i yearone-schema.sql