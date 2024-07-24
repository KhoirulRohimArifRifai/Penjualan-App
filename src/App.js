import React, { Component } from 'react'
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import {NavBarComponent} from './components'
import {Homes,Sukses} from './pages'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBarComponent/>
          <main>
          <Routes>
            <Route path="/" element={<Homes />} />
            <Route path="/sukses" element={<Sukses />} />
          </Routes>
          </main>
      </BrowserRouter>
    )
  }
}
