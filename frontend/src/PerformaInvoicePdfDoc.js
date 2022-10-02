import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 35,
    paddingHorizontal: 30,
    fontSize: 10
  },
  section: {
    marginBottom: 30,
    lineHeight: "1.3pt"
  },
  title: {
    textTransform: "uppercase",
    marginBottom: 3,
    fontWeight: 900
  },
  note: {
    fontSize: 8
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  column: {
    width: 100,
    border: "1px solid black",
    borderCollapse: "collapse",
    padding: 5
  },
  header: {
    textTransform: "uppercase",
    fontWeight: "bold"
  }
});

const UserData = ({ data }) => {
  const user = data;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{user.name}</Text>
      <Text>GSTIN : {user.gstin}</Text>
      <Text>IEC : {user.iec}</Text>
      <Text>LUT : {user.lut}</Text>
      <Text style={styles.note}>
        Letter of undertaking means exporter will not pay IGST
      </Text>
    </View>
  );
};

const AccountData = ({ data }) => {
  return (
    <View style={{ ...styles.section, lineHeight: "1.5pt" }}>
      <Text style={styles.title}>Account details are as below</Text>
      <Text>Bank Name: {data.bankName}</Text>
      <Text>Bank Branch: {data.branch}</Text>
      <Text>Account Name: {data.accountName}</Text>
      <Text>Account Number: {data.accountNumber}</Text>
      <Text>IFSC Code: {data.ifsc}</Text>
    </View>
  );
};

const AdditionalData = ({ data }) => {
  return (
    <View style={{ ...styles.section, lineHeight: "1.5pt" }}>
      <Text style={styles.title}>Additional Details</Text>
      <Text>Place of origin: {data.origin}</Text>
      <Text>Port of discharge: {data.pod}</Text>
      <Text>Port of landing: {data.pol}</Text>
      <Text>Reason of shipping: {data.reason}</Text>
      <Text>Insured: {data.insured ? "Yes" : "No"}</Text>
      <Text>I certify above to be true and best of my knowledge</Text>
    </View>
  );
};

const CostTable = ({ data }) => {
  return (
    <View styles={styles.section}>
      {Object.entries(data).map((entry) => {
        const heading = entry[0].split("_").join(" ");
        return (
          <View
            style={{ display: "flex", flexDirection: "row" }}
            key={entry[0]}
          >
            <Text style={{ ...styles.column, textTransform: "uppercase" }}>
              {heading}
            </Text>
            <Text style={styles.column}>{entry[1]}</Text>
          </View>
        );
      })}
    </View>
  );
};

const AddressData = ({
  data,
  marginBottom = 35,
  marginTop = 0,
  label = ""
}) => {
  // console.log(Object.entries(data))
  return (
    <View style={{ ...styles.section, marginBottom, marginTop }}>
      {label ? <Text style={styles.title}>{label}</Text> : null}
      {Object.entries(data).map((d, i) => (
        <Text key={i}>{d[1]}</Text>
      ))}
    </View>
  );
};

const ItemsTable = ({ data }) => {
  return (
    <View style={styles.section}>
      <TableRow columns={Object.keys(data[0])} header />
      {data.map((row, idx) => (
        <TableRow columns={Object.values(row)} key={idx}/>
      ))}
    </View>
  );
};

const TableRow = ({ columns, header = false }) => {
  const rowStyles = header ? { ...styles.row, ...styles.header } : styles.row;
  return (
    <View style={rowStyles}>
      {columns.map((data, idx) => (
        <Text key={idx} style={styles.column}>
          {data}
        </Text>
      ))}
    </View>
  );
};

const Invoice = ({ data }) => {
  const {
    user,
    userAddress,
    buyer,
    buyerAddress,
    items,
    userAccount,
    cost,
    additionalDetails
  } = data;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date()
  const dateFormatted = date.toLocaleDateString("en-US", options)

  return (
    <Document>
      <Page style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <UserData data={user} />
          <View style={{ display: "flex", alignItems: "flex-end" }}>
            <Text
              style={{
                fontSize: 15,
                marginBottom: 15,
                textTransform: "uppercase"
              }}
            >
              Performa Invoice
            </Text>
            <Text>Date: {dateFormatted}</Text>
          </View>
        </View>
        <AddressData data={userAddress} label="Address" marginBottom={20} />
        <Text>TO</Text>
        <AddressData
          data={buyerAddress}
          marginTop={20}          
        />
        <ItemsTable data={items} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30
          }}
        >
          <AccountData data={userAccount} />
          <CostTable data={cost} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30
          }}
        >
          <AdditionalData data={additionalDetails} />
          <View>
            <Text style={{ textTransform: "uppercase" }}>
              For {user.name} Signature
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;