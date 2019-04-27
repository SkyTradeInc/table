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
    optionValues: {
      confirmed: 'all',
      paid: 'all',
      reconciled: 'all',
      manualConfirmed: 'all'
    },
    columns:[
      {
        Header: 'Invoice Number',
        accessor: 'invoiceNumber',
        filterMethod: (filter, row) =>
        row[filter.id].includes(filter.value)
      },
      {
        Header: 'To',
        accessor: 'to',
        filterMethod: (filter, row) =>
        row[filter.id].includes(filter.value)
      },
      {
        Header: 'Amount Due',
        accessor: 'amountDue'
      },
      {
        Header: 'Date',
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
      {
        Header: 'Confirmed',
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
            value={filter ? filter.value : "all"}
          >
            <option value="all">All</option>
            <option value="true">Confirmed</option>
            <option value="false">Not confirmed</option>
          </select>,
      },
      {
        Header: 'Paid',
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
            value={filter ? filter.value : "all"}
          >
            <option value="all">All</option>
            <option value="true">Paid</option>
            <option value="false">Not paid</option>
          </select>
      },
      {
        Header: 'Reconciled',
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
            value={filter ? filter.value : "all"}
          >
            <option value="all">All</option>
            <option value="true">Reconciled</option>
            <option value="false">Not reconciled</option>
          </select>
      },
      {
        Header: 'Manual Confirmed',
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
            value={filter ? filter.value : "all"}
          >
            <option value="all">All</option>
            <option value="true">Confirmed</option>
            <option value="false">Not confirmed</option>
          </select>
      }
    ],
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
			data = data.filter(row => {
				return row.invoiceNumber.toLowerCase().includes(this.state.search.toLowerCase()) ||
         row.amountDue.includes(this.state.search) ||
         String(row.date).includes(this.state.search)
			})
		}
		// let found = false
		// for(let i = 0; i<data.length; i++){
		// 	if ( data[i].name === 'RVN') {
		// 		found = true
		// 		const temp = data[i]
		// 		data.splice(i, 1);
		// 		data.unshift(temp)
		// 		break;
		// 	}
		// }
		// if(!found) {
		// 	const datas = this.state.data
		// 	for(let i=0; i<datas.length; i++) {
		// 		if(datas[i].name === 'RVN') {
		// 			data.unshift(datas[i])
		// 			break;
		// 		}
		// 	}
		// }

    return(
      <div>
			<span className="text-muted text-small mr-1"> Items per page: </span>
				<UncontrolledDropdown className="d-inline-block">
					<DropdownToggle caret color="outline-dark" size="xs">
						{this.state.selectedPageSize}
					</DropdownToggle>
					<DropdownMenu right>
						{this.state.pageSizes.map((size, index) => {
							return (
									<DropdownItem
											key={index}
											onClick={() => this.changePageSize(size)}
									>
										{size}
									</DropdownItem>
							);
						})}
					</DropdownMenu>
				</UncontrolledDropdown>
			<h4>Search: <input
						value={this.state.search}
						onChange={e => this.setState({search: e.target.value})}
					/></h4>
      <ReactTable
          data={data}
          columns={this.state.columns}
          defaultPageSize={this.state.selectedPageSize}
					filterable={true}
          resizable={true}
					className="-striped -highlight"

        />
      </div>
    )
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
