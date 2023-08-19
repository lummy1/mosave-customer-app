"use client";
import React, { Component } from 'react'
import Private from '../components/Layouts/Private';

type Props = {}

type State = {}

export default class page extends Component<Props, State> {
  state = {}

  render() {
    return (
      <Private>
      <div>This is Savings page</div>
      </Private>
    )
  }
}