import { IAMClient, CreatePolicyCommand, AttachUserPolicyCommand } from "@aws-sdk/client-iam";

const client = new IAMClient({ region: process.env.S3_REGION });

const bucketName = process.env.S3_BUCKET;

// Create a policy
export const createPolicy = async (username) => {
  const policyParams = {
    PolicyName: `${username}Policy`,
    PolicyDocument: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Sid: `Allow${username}Access`,
          Effect: "Allow",
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${bucketName}/${username}/*`],
        },
        {
          Sid: `Deny${username}AccessToOtherFolders`,
          Effect: "Deny",
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${bucketName}/*`],
          Condition: {
            StringNotEquals: {
              "s3:prefix": `${username}/`,
            },
          },
        },
      ],
    }),
  };

  const createPolicyCommand = new CreatePolicyCommand(policyParams);

  try {
    const response = await client.send(createPolicyCommand);
    console.log("Policy response:", response);

    const policyArn = response.Policy.Arn;
    console.log("Policy created:", policyArn);

    // Attach the policy to the user
    await attachPolicy(policyArn);
  } catch (err) {
    console.log("Error creating policy:", err);
  }
};

// Attach the policy to the user
const attachPolicy = async (username, policyArn) => {
  const attachPolicyParams = {
    PolicyArn: policyArn,
    UserName: username,
  };

  const attachUserPolicyCommand = new AttachUserPolicyCommand(attachPolicyParams);

  try {
    const response = await client.send(attachUserPolicyCommand);
    console.log("Policy attached to user:", response);
  } catch (err) {
    console.log("Error attaching policy to user:", err);
  }
};