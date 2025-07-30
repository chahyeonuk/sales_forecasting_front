import { useState } from "react"
import { IssueList } from "../components/IssueList"
import { IssueDetailPanel } from "../components/IssueDetailPanel"
import { RestockingPlan } from "../components/RestockingPlan"

export function IssuesPage() {
  const [selectedIssue, setSelectedIssue] = useState(null)

  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue)
  }

  const handleIssueUpdate = (updatedIssue) => {
    setSelectedIssue(updatedIssue)
    // In a real app, you would also update the issue in your data store
  }

  return (
    <div className="p-6">
      <h1 className="mb-6">Issue Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Issue List */}
        <div className="lg:col-span-1">
          <IssueList 
            onIssueSelect={handleIssueSelect}
            selectedIssueId={selectedIssue?.id}
          />
        </div>
        
        {/* Detail Panel and Restocking Plan */}
        <div className="lg:col-span-2 space-y-6">
          <IssueDetailPanel 
            issue={selectedIssue}
            onUpdate={handleIssueUpdate}
          />
          
          <RestockingPlan selectedIssue={selectedIssue} />
        </div>
      </div>
    </div>
  )
}