# Code to perform mongodb db.collection.find()

## Need to update the mongodb uri in the template.yaml

Note: 
    Environment:
      Variables:
        mongodbUsername: !Join ['',[/mongodb/, !Ref Stage ,/username]] # Note
        mongodbPassword: !Join ['', [/mongodb/, !Ref Stage ,/password]]