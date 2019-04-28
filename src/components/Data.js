import React, { Component } from 'react';
import "react-table/react-table.css";
import ReactTable from "react-table";
import {
  Row,
  Card,
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  UncontrolledDropdown,
  Collapse,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  CardBody,
  CardSubtitle,
  CardImg,
  CardTitle,
  Label,
  CardText,
  Badge, Form, UncontrolledAlert
} from "reactstrap";


const json = {
	"data": [
    {
      invoiceNumber: 'INV-0014',
      to: 'ccy ltd',
      amountDue: '48.4',
      date: '26-2-2019',
      confirmed: 'false',
      paid: 'false',
      reconciled: 'true',
      manualConfirmed: 'false'
    },
    {
      invoiceNumber: 'INV-0013',
      to: 'ccy ltd',
      amountDue: '36.3',
      date: '26-2-2019',
      confirmed: 'true',
      paid: 'true',
      reconciled: 'true',
      manualConfirmed: 'false'
    },
    {
      invoiceNumber: 'INV-0012',
      to: 'ccy ltd',
      amountDue: '242',
      date: '25-2-2019',
      confirmed: 'true',
      paid: 'false',
      reconciled: 'true',
      manualConfirmed: 'false'
    }
  ]

}


class Data extends Component {
  state = {
    ready: false,
		search: '',
    show: {
      invoiceNumber: true,
      to: true,
      amountDue: true,
      date: true,
      confirmed: true,
      paid: true,
      reconciled: true,
      manualConfirmed: true
    },
    selectOptions: {
      confirmed: 'all',
      paid: 'all',
      reconciled: 'all',
      manualConfirmed: 'all'
    },
    data: [],
    selectedPageSize: 10,
		pageSizes: [10,100],
		currentPage: 1,
    filtered: []
  }

	changePageSize(size) {
	 this.setState({ selectedPageSize: size, currentPage: 1});
 }

  componentDidMount() {
   this.getData()
  }


  render() {
		let data = this.state.data
		if (this.state.search) {
      const search = this.state.search
			data = data.filter(row => {
				return(
         row.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
         row.to.toLowerCase().includes(search.toLowerCase()) ||
         row.amountDue.includes(search) ||
         row.date.includes(search)
       )
       })
		}
    return(
      <div>

			<h4>Search: <input
						value={this.state.search}
						onChange={e => this.setState({search: e.target.value})}
					/></h4>

      <div>
      <label>Invoice Number</label>
      <input name="invoiceNumber" type="checkbox" onChange={this.columnShowHide.bind(this)} checked={this.state.show.invoiceNumber}/>
      <label>To</label>
      <input name="to" type="checkbox" onChange={this.columnShowHide.bind(this)} checked={this.state.show.to}/>
      <label>Amount Due</label>
      <input name="amountDue" type="checkbox" onChange={this.columnShowHide.bind(this)} checked={this.state.show.amountDue}/>
      <label>Date</label>
      <input name="date" type="checkbox" onChange={this.columnShowHide.bind(this)} checked={this.state.show.date}/>
      <label>Confirmed</label>
      <input name="confirmed" type="checkbox" onChange={this.columnShowHide.bind(this)} checked={this.state.show.confirmed}/>
      <label>Paid</label>
      <input name="paid" type="checkbox" onChange={this.columnShowHide.bind(this)} checked={this.state.show.paid}/>
      <label>Reconciled</label>
      <input name="reconciled" type="checkbox" onChange={this.columnShowHide.bind(this)} checked={this.state.show.reconciled}/>
      <label>Manually Confirmed</label>
      <input name="manualConfirmed" type="checkbox" onChange={this.columnShowHide.bind(this)} checked={this.state.show.manualConfirmed}/>
      </div>
      <ReactTable
          data={data}
          columns={[
            {
              Header: 'Invoice Number',
              minResizeWidth: 50,
              accessor: 'invoiceNumber',
              show: this.state.show.invoiceNumber,
              filterMethod: (filter, row) =>
              row[filter.id].includes(filter.value)
            },
            {
              Header: 'To',
              minResizeWidth: 50,
              show: this.state.show.to,

              accessor: 'to',
              filterMethod: (filter, row) =>
              row[filter.id].includes(filter.value)
            },
            {
              Header: 'Amount Due',
              minResizeWidth: 50,
              show: this.state.show.amountDue,

              accessor: 'amountDue'
            },
            {
              Header: 'Date',
              minResizeWidth: 50,
              show: this.state.show.date,

              accessor: 'date',
              filterMethod: (filter, row) => {
                console.log(filter.value)
                if(!filter.dateValueReversed) {
                  filter.value = filter.value.split("-").reverse().join("-").replace("-0", "-");
                  filter.dateValueReversed = true
                }
                if (filter.value === "all") {
                  return true;
                }
                return filter.value == row.date
              },
              Filter: ({ filter, onChange }) =>
                  <input
                  type="date"
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}>
                </input>,
            },

            //////////////////////////// HERE ///////////////
            {
              Header: 'Confirmed',
              minResizeWidth: 50,
              show: this.state.show.confirmed,

              accessor: 'confirmed',
              filterMethod: (filter, row) => {
                if (filter.value === "all") {
                  return true;
                }
                if(filter.value === "true") {
                  return row[filter.id] === "true";
                } else {
                  return row[filter.id] === "false";
                }
              },
              Filter: ({ filter, onChange }) =>
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  multiple={true}
                  value={[this.state.selectOptions.confirmed]}
                >
                  <option name="confirmed" onClick={this.changeSelected.bind(this)} value="all">All</option>
                  <option name="confirmed" onClick={this.changeSelected.bind(this)} value="true">Confirmed</option>
                  <option name="confirmed" onClick={this.changeSelected.bind(this)} value="false">Not confirmed</option>
                </select>,
            },
            {
              Header: 'Paid',
              minResizeWidth: 50,
              show: this.state.show.paid,

              accessor: 'paid',
              filterMethod: (filter, row) => {
                if (filter.value === "all") {
                  return true;
                }
                if(filter.value === "true") {
                  return row[filter.id] === "true";
                } else {
                  return row[filter.id] === "false";
                }
              },
              Filter: ({ filter, onChange }) =>
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  multiple={true}
                  value={[this.state.selectOptions.paid]}
                >
                  <option name="paid" onClick={this.changeSelected.bind(this)} value="all">All</option>
                  <option name="paid" onClick={this.changeSelected.bind(this)} value="true">Paid</option>
                  <option name="paid" onClick={this.changeSelected.bind(this)} value="false">Not paid</option>
                </select>
            },
            {
              Header: 'Reconciled',
              minResizeWidth: 50,
              show: this.state.show.reconciled,

              accessor: 'reconciled',
              filterMethod: (filter, row) => {
                if (filter.value === "all") {
                  return true;
                }
                if(filter.value === "true") {
                  return row[filter.id] === "true";
                } else {
                  return row[filter.id] === "false";
                }
              },
              Filter: ({ filter, onChange }) =>
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  multiple={true}
                  value={[this.state.selectOptions.reconciled]}
                >
                  <option name="reconciled" onClick={this.changeSelected.bind(this)} value="all">All</option>
                  <option name="reconciled" onClick={this.changeSelected.bind(this)} value="true">Reconciled</option>
                  <option name="reconciled" onClick={this.changeSelected.bind(this)} value="false">Not reconciled</option>
                </select>
            },
            {
              Header: 'Manual Confirmed',
              minResizeWidth: 50,
              show: this.state.show.manualConfirmed,

              accessor: 'manualConfirmed',
              filterMethod: (filter, row) => {
                filter.selected = 'selected'
                if (filter.value === "all") {
                  return true;
                }
                if(filter.value === "true") {
                  return row[filter.id] === "true";
                } else {
                  return row[filter.id] === "false";
                }
              },
              Filter: ({ filter, onChange }) =>
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  multiple={true}
                  value={[this.state.selectOptions.manualConfirmed]}
                >
                  <option name="manualConfirmed" onClick={this.changeSelected.bind(this)} value="all">All</option>
                  <option name="manualConfirmed" onClick={this.changeSelected.bind(this)} value="true">Confirmed</option>
                  <option name="manualConfirmed" onClick={this.changeSelected.bind(this)} value="false">Not confirmed</option>
                </select>
            }
          ]}
          defaultPageSize={this.state.selectedPageSize}
					filterable={true}
          resizable={true}
					className="-striped -highlight"

        />
      </div>
    )
  }

  columnShowHide(e) {
    const show = this.state.show
    show[e.target.name] = !show[e.target.name]
    this.setState({show});
  }

  changeSelected(e) {
    console.log('changeSelected')
    const selectOptions = this.state.selectOptions
    selectOptions[e.target.getAttribute('name')] = [e.target.value]
    this.setState({selectOptions});
  }

  getData() {
    const coins = json.data
    let data = []
    for(let i=0; i<coins.length; i++) {
      data.push({
        invoiceNumber: coins[i].invoiceNumber,
        to: coins[i].to,
        amountDue: coins[i].amountDue,
        date: coins[i].date,
        confirmed: coins[i].confirmed,
        paid: coins[i].paid,
        reconciled: coins[i].reconciled,
        manualConfirmed: coins[i].manualConfirmed
      })
    }
    this.setState({data})
  }


}

export default Data
