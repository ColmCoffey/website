# Deploying a Serverless Web App with GitHub, React, and AWS Amplify

## Executive Summary
This guide provides step-by-step instructions for deploying a serverless web application using React, GitHub, and AWS Amplify. It covers the setup process, configuration, and deployment steps. AWS Amplify simplifies Continuous Integration and Continuous Deployment (CI/CD) pipelines, providing seamless updates and scalability.

## Use Cases and Benefits of AWS Amplify for CI/CD Pipelines
- **Automation**: Automates build, deployment, and hosting for modern web applications.
- **Scalability**: Easily scales with usage without manual intervention.
- **Custom Domains**: Simplifies domain management and provides free SSL certificates.
- **Integration**: Supports multiple frameworks and connects to GitHub, GitLab, and Bitbucket.
- **Monitoring**: Built-in logs and monitoring tools for deployment and performance tracking.

---

## Skills and Services Used
- **Languages and Frameworks**: JavaScript, React
- **Version Control**: Git, GitHub
- **Cloud Services**: AWS Amplify, Amazon Route 53 (for domains)
- **Deployment Tools**: AWS Amplify Console, CI/CD Pipelines
- **Security Features**: Amplify Managed Certificates for SSL

---

## Prerequisites
1. A working React app prototype that runs in the browser.
2. GitHub CLI installed and configured with access to your repository.
3. A GitHub repository with code pushed and ready for deployment.
4. Build packages including all dependencies for the React app.

---

## Step-by-Step Guide to Deploy a React Web App on AWS Amplify

### Step 1: Create a New App in AWS Amplify
1. Log in to the AWS Management Console.
2. In the search bar, type **Amplify** and select **AWS Amplify** from the services list.
3. Click **New App > Host Web App** to begin the setup process.

---

### Step 2: Connect to GitHub Repository
1. Select **GitHub** (or GitLab/Bitbucket) as the source code provider.
2. Amplify will redirect you to GitHub for authorization.
3. Click **Authorize AWS Amplify** to grant access to your repositories.
4. After authorization, Amplify will list your repositories.

---

### Step 3: Select Repository and Branch
1. From the repository list, choose the one containing your React app code.
2. Select the branch you want to deploy (e.g., `main` or `master`).

---

### Step 4: Review and Confirm Build Settings
1. Amplify automatically detects you’re using a React app and generates a default build configuration (`amplify.yml`).
2. Review the settings. If no custom scripts are needed, leave them as-is.
3. For advanced setups, you can edit the `amplify.yml` file.
4. Click **Save and Deploy** to start the deployment process.

---

### Step 5: Monitor Deployment Process
1. Navigate to the Amplify Console to track the build and deployment progress.
2. Amplify runs each step, including installation, build, and deployment.
3. If any errors occur, check the logs in the **Build** tab.

---

### Step 6: Add a Custom Domain (Optional)
1. Go to **Hosting > Custom Domains** in the Amplify Console.
2. Enter your domain name and click **Configure Domain**.

---

### Step 7: Configure Subdomains and SSL
1. Add subdomains (e.g., `www.example.com`) if needed.
2. Enable Amplify-managed certificates for automatic SSL configuration to secure your site with HTTPS.

---

### Step 8: SSL Certificate Activation
1. Wait for the SSL certificate creation process to complete (can take 15–30 minutes).
2. Verify that your site is accessible via HTTPS.

---

### Step 9: Final Verification
1. Confirm that the custom domain is active and resolves correctly in the browser.
2. Check for HTTPS security by looking for a padlock icon in the address bar.

---

### Step 10: Access the Deployed App
1. Copy the deployed URL provided in the Amplify Console.
2. Open the link in multiple devices and browsers to confirm the app works as expected.

---

## Overcoming Challenges

| **Issue**                | **Cause**                        | **Solution**                                 |
|--------------------------|-----------------------------------|---------------------------------------------|
| Build failures           | Missing dependencies or scripts  | Verify `package.json` and `amplify.yml`.    |
| SSL certificate pending  | DNS propagation delay            | Wait up to 24 hours and confirm DNS records.|
| Deployment not updated   | Cache issues or missed commits   | Clear cache in Amplify, verify GitHub commits. |
| Domain not resolving     | Incorrect DNS setup              | Check DNS records in Route 53 or domain registrar.|

---

## Further Development
1. **Enhance Functionality**: Add APIs using AWS Lambda.
2. **Authentication**: Integrate AWS Cognito for user authentication.
3. **Monitoring**: Enable AWS CloudWatch for logs and performance tracking.
4. **Scaling**: Use Amplify’s backend tools for data storage and workflows.

---

## Conclusion
You now have a fully functional, serverless web app deployed with AWS Amplify and GitHub. This setup supports CI/CD, scalability, and custom domains, making it ideal for modern web applications. For more information, visit the [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/).

