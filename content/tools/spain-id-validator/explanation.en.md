Spanish identifier data often mixes DNI, NIE, NIF, legacy CIF labels, and EU VAT prefixes. This workbench separates those concepts before validating the control character.

DNI and NIE use the same modulo-23 control-letter table. Legal-entity NIF values, often still called CIF in older systems, use a weighted control digit or letter based on the entity prefix.
