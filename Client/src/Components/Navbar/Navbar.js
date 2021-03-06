import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthOptions from '../AuthOptions/AuthOptions'

export default class Navbar extends Component{
  render() {
    return (
      <nav>
        <div>
          <div>
            <Link to="/">
              logo
            </Link>
          </div>
            <ul>
              <li>
                <Link to='/'>home</Link>
              </li>
            </ul>
            <AuthOptions />
        </div>
      </nav>
    )
  }
}
