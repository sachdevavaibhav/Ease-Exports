import React from "react";
import { AccountDetailsForm } from './AccountDetailsForm';
import { AdditionalDetailsForm } from './AdditionalDetailsForm';
import { BuyerAddressForm } from './BuyerAddressForm';
import { ExporterAddressForm } from './ExporterAddressForm';
import { ExporterDetailsForm } from './ExporterDetailsForm';
import { ItemListForm } from './ItemListForm';

import ExportInvoicePdfDoc from './ExportInvoicePdfDoc';
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

import {
    TextInput,
    NumberInput,
    ParaInput,
    DateInput,
    EmailInput
} from './Inputs';

/* 
What we need for this invoice ?

1. Exporter details
    NAME
    GSTIN
    IEC
    LUT (if LUT then not paying IGST)

2. Exporter Address
    ADDRESS LINE 1
    ADDRESS LINE 2
    PINCODE
    CITY
    STATE
    COUNTRY

3. Buyer Address
    NAME
    ADDRESS LINE 1
    ADDRESS LINE 2
    PINCODE
    CITY
    STATE
    COUNTRY

4. Items details
    each item will have
        HSN CODE
        DESCRIPTION
        QTY
        RATE (individual)
        VALUE (total)


5. Derived Values
    TOTAL VALUE BEFORE TAX
    CGST
    SGST
    IGST
    TOTAL AFTER TAXES

6. Account Details
    BANK NAME
    BRANCH
    NAME
    NUMBER
    IFSC

7. ADDITIONAL DETAILS
    ORIGIN
    PORT OF DISCHARGE
    PORT OF LANDING
    REASON FOR EXPORT
    INSURANCE (Boolean)
    STATEMENT OF ASSURANCE (I certify above to be true and best of my knowledge)
*/

const initialState = {
    exporterDetails: {
        name: 'vaibhav textile',
        gstin: 123434,
        lut: 89787,
        iec: 4324324
    },
    exporterExtras: {
        pi: 23234234234,
        piDate: new Date(10, 10, 10),
        lc: 3545345345,
        lcDate: new Date(9, 9, 9)
    },
    exporterAddress: {
        addressLine1: 'abc road',
        addressLine2: 'xyz square',
        city: 'bermuda',
        state: 'triangle',
        pincode: 123456
    },    
    exporterContact: {
        phone: '12345-56564',
        email: 'exporter@mail.com'
    },
    buyerAddress: {
        name: 'john doe',
        addressLine1: 'abc road',
        addressLine2: 'xyz square',
        city: 'quinfox',
        state: 'hexagon',
        pincode: 123456
    },
    buyerContact: {
        phone: '12345-56564',
        email: 'exporter@mail.com'
    },
    buyerEXIM: {
        exim: 1232343,
        pan: 'fdvc345bj4',
        bankName: 'BOB'
    },
    items: [
        {
            hsn: 1200122,
            description: 'Rug',
            qty: 12,
            rate: 5,
            value: 60
        }
    ],
    accountDetails: {
        bankName: 'YES BANK',
        branch: 'Panipat',
        accountName: 'John Doe',
        accountNumber: 200022334223,
        ifsc: 23234
    },
    additionalDetails: {
        origin: 'Bermuda',
        pod: 'Bermuda Port',
        pol: 'Quinfox port',
        reason: 'SALE',
        insured: false
    }
}

const ExporterExtraDetailsForm = ({state, handleInputChange}) => {
    return (
        <>
            <p>Exporter Extra Details</p>
            <div>
                <NumberInput 
                        placeholder='PI Number' 
                        onChange={ handleInputChange('pi') }
                        value={state.pi}/>
                <DateInput 
                        placeholder='PI Dated On' 
                        onChange={ handleInputChange('piDate') }
                        value={state.piDate}/>
                <NumberInput 
                        placeholder='LC Number' 
                        onChange={ handleInputChange('lc') }
                        value={state.lc}/>
                <DateInput 
                        placeholder='LC Dated On' 
                        onChange={ handleInputChange('lcDate') }
                        value={state.lcDate}/>
            </div>
        </>
    )
}

const ExporterContactForm = ({state, handleInputChange}) => {
    return (
        <>
            <p>Exporter Contact Details</p>
            <div>
                <TextInput 
                        placeholder='Phone Number' 
                        onChange={ handleInputChange('phone') }
                        value={state.phone}/>
                <EmailInput 
                        placeholder='Email' 
                        onChange={ handleInputChange('email') }
                        value={state.email}/>
            </div>
        </>
    )
}

const BuyerContactForm = ({state, handleInputChange}) => {
    return (
        <>
            <p>Buyer Contact Details</p>
            <div>
                <TextInput 
                        placeholder='Phone Number' 
                        onChange={ handleInputChange('phone') }
                        value={state.phone}/>
                <EmailInput 
                        placeholder='Email' 
                        onChange={ handleInputChange('email') }
                        value={state.email}/>
            </div>
        </>
    )
}

const BuyerEXIMDetailsForm = ({state, handleInputChange}) => {
    return (
        <>
            <p>Buyer EXIM Details</p>
            <div>
                <NumberInput 
                        placeholder='EXIM Number' 
                        onChange={ handleInputChange('exim') }
                        value={state.exim}/>
                <TextInput 
                        placeholder='PAN Number' 
                        onChange={ handleInputChange('exin') }
                        value={state.exin}/>
                <TextInput 
                        placeholder='Bank Name' 
                        onChange={ handleInputChange('bankName') }
                        value={state.bankName}/>
            </div>
        </>
    )
}

// Font.register({
//     family: 'Oswald',
//     src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
// })

const ExportInvoice = props => {
 
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
            <h1>Export invoice</h1>
            <ExporterDetailsForm state={state.exporterDetails} handleInputChange={generateChangeHandler('exporterDetails')} />
            <ExporterExtraDetailsForm state={state.exporterExtras} handleInputChange={generateChangeHandler('exporterExtras')} />
            <ExporterAddressForm state={state.exporterAddress} handleInputChange={generateChangeHandler('exporterAddress')} />
            <ExporterContactForm state={state.exporterContact}handleInputChange={generateChangeHandler('exporterContact')} />
            <BuyerAddressForm state={state.buyerAddress} handleInputChange={generateChangeHandler('buyerAddress')} />
            <BuyerEXIMDetailsForm state={state.buyerEXIM} handleInputChange={generateChangeHandler('buyerEXIM')} />
            <BuyerContactForm state={state.buyerContact} handleInputChange={generateChangeHandler('buyerContact')} />
            <ItemListForm items={state.items} generateChangeHandler={generateItemsChangeHandler} />
            <AccountDetailsForm state={state.accountDetails} handleInputChange={generateChangeHandler('accountDetails')} />
            <AdditionalDetailsForm state={state.additionalDetails} handleInputChange={generateChangeHandler('additionalDetails')} />
        
            <button onClick={handleSubmit}>Submit</button>

            { show 
                ? (
                    <PDFDownloadLink 
                        document={<ExportInvoicePdfDoc data={{
                            user: state.exporterDetails,
                            userExtraData: state.exporterExtras,
                            userAddress: state.exporterAddress, 
                            userContact: state.exporterContact,                           
                            buyerAddress: state.buyerAddress,
                            buyerExim: state.buyerEXIM,
                            buyerContact: state.buyerContact,
                            items: state.items,
                            cost: {
                                total_without_tax: 14000,
                                cgst: 50,
                                igst: 50,
                                sgst: 50,
                                total_after_tax: 1000
                            },
                            userAccount: state.accountDetails,
                            additionalDetails: state.additionalDetails
                        }}/>}
                        fileName='export-invoice'
                    >
                        download invoice
                    </PDFDownloadLink>
                ) 
                : null
            }
        </div>
    )
}

export default ExportInvoice;