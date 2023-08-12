"use client"
import Private from '../components/Layouts/Private'
import { connect } from 'react-redux';

import React, { Component } from 'react'
import { fetch } from '@/redux/features/profile/profileSlice';

type Props = {}

type State = {
  mount: boolean
}

class DashboardPage extends Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      mount: false
    }
  }

  componentDidMount() {
    this.setState({ mount: true })
  }

  render() {
    return (
      <>
        {this.state.mount && (
          <Private>
            <div>
              This is the dashboard page
            </div>
          </Private>
        )}
      </>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
      signIn: () => dispatch(fetch())
  }
};
export default connect(null, mapDispatchToProps)(DashboardPage)
