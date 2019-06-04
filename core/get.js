import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib"

export const main = async (event, context) => {
  
  const params = {
    TableName: process.env.tableName,
    FilterExpression: "#peId = :priceEstimationId",
    ExpressionAttributeNames:{
        "#peId": "priceEstimationId"
    },
    ExpressionAttributeValues: {
      ":priceEstimationId": event.pathParameters.id
    }
  }

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success({count:result.Items.length, bookings: result.Items})
  } catch (e) {
    return failure({ status: false })
  }

}