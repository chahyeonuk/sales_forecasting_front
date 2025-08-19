import { useState } from "react"
import { SKUSearchAndList } from "../components/SKUSearchAndList"
import { SKUDetailForm } from "../components/SKUDetailForm"

export function MasterPage() {
  const [selectedSKU, setSelectedSKU] = useState(null)
  const [isNewSKU, setIsNewSKU] = useState(false)

  const handleSKUSelect = (sku) => {
    setSelectedSKU(sku)
    setIsNewSKU(false)
  }

  const handleNewSKU = () => {
    setSelectedSKU(null)
    setIsNewSKU(true)
  }

  const handleSKUSave = (updatedSKU) => {
    // In a real app, you would save to your data store
    console.log('Saving SKU:', updatedSKU)
    setSelectedSKU(updatedSKU)
    setIsNewSKU(false)
  }

  const handleCancel = () => {
    setIsNewSKU(false)
    setSelectedSKU(null)
  }

  return (
    <div className="p-6">
      <h1 className="mb-6">SKU Master</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* SKU Search and List */}
        <div className="lg:col-span-1">
          <SKUSearchAndList 
            onSKUSelect={handleSKUSelect}
            onNewSKU={handleNewSKU}
            selectedSKUId={selectedSKU?.id}
          />
        </div>
        
        {/* SKU Detail Form */}
        <div className="lg:col-span-1">
          <SKUDetailForm 
            sku={selectedSKU}
            onSave={handleSKUSave}
            onCancel={handleCancel}
            isNew={isNewSKU}
          />
        </div>
      </div>
    </div>
  )
}