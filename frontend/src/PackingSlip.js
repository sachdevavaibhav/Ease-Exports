import React from "react";
import { ItemListForm } from './ItemListForm';
import { ExporterDetailsForm } from './ExporterDetailsForm';
import { PDFDownloadLink } from "@react-pdf/renderer";

import PackingSlipPdfDoc from './PackingSlipPdfDoc';

const initialState = {
    exporterDetails: {
        name: 'vaibhav textile',
        description: 'manufacturer of dari and bedsheets'
    },
    items: [
        {
            hsn: 1200122,
            description: 'Rug',
            qty: 12,
            rate: 5,
            value: 60
        }
    ]
}

const PackingSlip = props => {
 
    const [state, setState] = React.useState(initialState);
    const [show, setShow] = React.useState(false);

    const handleSubmit = () => {
        // validation
        setShow(!show);
    }

    const generateChangeHandler = (section) => {
        return (key) => {
            return ({target}) => {
                setState({...state, [section]: {...state[section], [key]: target.value}})
            }
        }
    }

    const generateItemsChangeHandler = (index) => {
        return (key) => {
            return ({target}) => {                
                const oldItem = state.items[index];
                const newItem = {...oldItem, [key]: target.value};
                const updatedItems = state.items.map( (item, idx) => idx === index ? newItem : item );
                setState({...state, items: updatedItems});
            }
        }
    }

    return (
        <div>
            <h2>Packing Slip</h2>
            <ExporterDetailsForm state={state.exporterDetails} handleInputChange={generateChangeHandler('exporterDetails')} />
            <ItemListForm items={state.items} generateChangeHandler={generateItemsChangeHandler} />
            <button onClick={handleSubmit}>Submit</button>
            {
                show 
                ? (
                    <PDFDownloadLink 
                        document={<PackingSlipPdfDoc data={{
                            user: state.exporterDetails,                            
                            items: state.items                            
                        }}/>}
                        fileName='packing-slip'
                    >
                        download packing slip
                    </PDFDownloadLink>
                ) 
                : null
            }
        </div>
    )
}

export default PackingSlip;