// Get Username Password from SSM Parameter Store
const AWS = require('aws-sdk')
var ssm = new AWS.SSM({
    apiVersion: '2014-11-06',
    region: 'us-east-1'
});

// let event = {};
module.exports.dbUser = async () => {
// async function dbUser(event) {
    // var username_params = {
    //     Name: `/mongodb/dev/username`,
    //     WithDecryption: true //true || 
    // };

    // var result = await ssm.getParameter(params1).promise().then((data, err) => {
    //     if (err) console.log(err, err.stack);
    //     else return data.Parameter.Value
    // });
    var params1 = {
        Path: `/mongodb/dev`,
        Recursive: true,
        WithDecryption: true //true || 
    };
    var result = await ssm.getParametersByPath(params1).promise().then((data, err) => {
        if (err) console.log(err, err.stack);
        else return data

    });
    
    // console.log(result.Parameters)
    // event = result
    // console.log(event)
    return result


}

// dbUser(event)


