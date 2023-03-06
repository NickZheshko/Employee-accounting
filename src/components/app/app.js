import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import EmployeesListItem from '../employees-list-item/employees-list-item';

import './app.css'; // webpack сам найдет файл


class App extends Component {
    constructor(props) {
    super(props)
    this.state = {
        data : [
            {name: 'Pavel D', salary: 500, increase: false, rise: true, id: 1},
            {name: 'Elisei Z', salary: 800, increase: false, rise: false, id: 2},
            {name: 'Nick Z', salary: 1000, increase: true, rise: false, id: 3}
        ],
        term: '',
        filter: 'all'
    }
    this.maxId = 4
}

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        let newItem = {name: name, salary: salary, increase: false, id: this.maxId};
        this.maxId++;
        this.setState(({data}) => {
            const newArr = [...data, newItem]
                return {
                    data: newArr
                }
        })
    }

    onToogleProp = (id, prop) => {
        this.setState(({data}) => ({  // зачем круглая скобка перед фигурной?
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                    return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term: term})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render () {
        const {data, term, filter} = this.state;
        const increased = this.state.data.filter(item => item.increase).length;
        const vivsibleData = this.filterPost(this.searchEmp(data, term), filter);                           // отфильтрованный массив
        return (
            <div className="app">
                    <AppInfo 
                    onEmployees={this.state.data.length}
                    onIncreaseEmployees={increased}/>
              
                <div className="search-panel"> 
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
      
                    <EmployeesList 
                      data={vivsibleData}
                      onDelete={this.deleteItem}
                      onToogleProp={this.onToogleProp}
                    />
                    <EmployeesAddForm onAdd={this.addItem}/>
            </div>
          );
    }
   
}

export default App; // экспорт компонента по умолчанию