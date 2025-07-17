import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="workflow-container">
      <h2>🚀 Project Deployment Workflow</h2>
      <ul className="workflow-list no-bullets">
        <li>Code changes are made and pushed to the Git repository.</li>
        <li>Jenkins automatically fetches the latest code from Git.</li>
        <li>Using Jenkins scripts, the project is compiled and a production build is generated.</li>
        <li>The build package is then deployed to an AWS S3 bucket.</li>
        <li>Once deployment is successful, an email notification is sent to confirm the deployment.</li>
      </ul>

    </div>
  )
}

export default App
