---
---
const deployConfig = {{ site.deploy_config | jsonify }};
const config = {
  apiKey: deployConfig.api_key,
  authDomain: deployConfig.auth_domain,
  databaseURL: deployConfig.database_url,
  projectId: deployConfig.project_id,
  storageBucket: deployConfig.storage_bucket,
  messagingSenderId: deployConfig.messaging_sender_id,
};
firebase.initializeApp(config);
