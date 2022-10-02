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
    width: 110,
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
    <View style={{...styles.section, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{...styles.title, fontSize: 16}}>{user.name}</Text>
      <Text>{user.description}</Text>
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
    items
  } = data;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date()
  const dateFormatted = date.toLocaleDateString("en-US", options)

  return (
    <Document>
      <Page style={styles.container}>
        <UserData data={user} />
        <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row'}}>
            <Text style={{ width: 150 }}>Packing Slip</Text>
            <Text style={{ width: 150 }}>Date: {dateFormatted}</Text>
        </View>
        <ItemsTable data={items} />        
      </Page>
    </Document>
  );
};

export default Invoice;