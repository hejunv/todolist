import React, { Component } from 'react';
import { Layout } from 'antd';
import Form from './components/Form';
import DataList from './components/DataList';
import Footer from './components/Footer';
import './todolist.less'

const { Header, Content} = Layout;

class TodoList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: []
    }
  }
  componentDidMount () {
    var todoList = JSON.parse(localStorage.getItem("todoList"));
    if (todoList) {
      this.setState({
        list: todoList

      })
    }
  }

  UpdataItem (id) {
    //弹出输入框，用于填写新内容
    var str = prompt('请输入修改内容：')
    if (str != null) {
      //二次确认
      var ok = window.confirm('确认修改吗？')
      if (ok) {
        var datas = JSON.parse(localStorage.getItem("todoList"));
        let deleteIndex = datas.findIndex(item => {
          return item.id === id
        })
        datas.splice(deleteIndex, 1, {content: str,
          isComplete: false});
        this.setState({
          list: datas
        })

        localStorage.setItem("todoList", JSON.stringify(datas));
      }
    }
  }


  deleteItem (id) {
    var datas = JSON.parse(localStorage.getItem("todoList"));
    let deleteIndex = datas.findIndex(item => {
      return item.id === id
    })
    datas.splice(deleteIndex, 1)
    this.setState({
      list: datas
    })
    localStorage.setItem("todoList", JSON.stringify(datas));
  }

  changeItem (id) {
    var datas = JSON.parse(localStorage.getItem("todoList"));
    let changeIndex = datas.findIndex(item => {
      return item.id === id
    })
    datas[changeIndex].isComplete = !datas[changeIndex].isComplete
    this.setState({
      list: datas
    })
    localStorage.setItem("todoList", JSON.stringify(datas));
  }

  handleSearchItem(value) {
    var datas = JSON.parse(localStorage.getItem("todoList"));
    let newList = datas.filter(item => {
      return item.content.indexOf(value) !== -1
    })


    this.setState({
      list: newList
    })
  }

  addItem (item) {
    var datas = JSON.parse(localStorage.getItem("todoList"));
    datas.push(item)
    this.setState({
      list: datas
    })
    localStorage.setItem("todoList", JSON.stringify(datas));
  }

  render () {
    return (
      <Layout className="todolist-layout">
        <Header>
        <h3 className="logo">TodoList</h3>
        </Header>
        <Content className="todolist-content">
          <Form searchItem={value => this.handleSearchItem(value)}></Form>
          <DataList list={this.state.list} UpdataItem={id => this.UpdataItem(id)} deleteItem={id => this.deleteItem(id)} changeItem={id => this.changeItem(id)}></DataList>
          <Footer addItem={item => this.addItem(item)}></Footer>
        </Content>
      </Layout>
    )
  }
}

export default TodoList;