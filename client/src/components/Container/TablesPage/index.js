import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import FloorPlan from '../../Presentational/FloorPlan';
import FreeFloorPlan from '../../Presentational/FreeFloorPlan';
// import Loading from '../../Presentational/Loading';
import {
  getTables,
  moveTable,
  toggleTable,
  clearServerTables
} from '../../../redux/actions/tables';
import { getParties, clearSelected } from '../../../redux/actions/party';

import * as s from './styles';

class TablesPage extends Component {
  constructor(props) {
    super(props);

    this.floorplanParent = React.createRef();
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.getTables(match.params.id);
    this.props.getParties();
  }

  componentWillUnmount() {
    this.props.clearSelected();
  }

  clearServerTables = () => {
    this.props.clearServerTables();
  };

  openParty = tableNumber => {
    const foundParty = this.props.partyList
      .find(party => party.tables
        .find(table => table.number === tableNumber));

    if (foundParty) {
      this.props.history.push(`/party/${foundParty._id}`);
    } else {
      console.error('some stuff reallllly went wrong in TablesPage Container');
    }
  };

  toggleTable = table => {
    this.props.toggleTable(table);
  };

  render() {
    const authorized = this.props.role.admin || this.props.role.manager;
    const {
      membership,
      editing,
      tables,
      selected,
      moveTable: moveTableAction,
      serverTables,
      match
    } = this.props;

    let tablesToDisplay = tables;
    if (!membership) {
      tablesToDisplay = tables.slice(0, 5);
    }

    return (
      <s.FloorPlanContainer innerRef={this.floorplanParent}>
        {match.params.id && (
          <button style={{ position: 'absolute' }} type="button" onClick={this.clearServerTables}>
            {'< 😜'}
          </button>
        )}
        {membership ? (
          <React.Fragment>
            {this.floorplanParent.current && (
              <FloorPlan
                editing={editing && authorized}
                tables={tablesToDisplay}
                selected={selected}
                moveTable={moveTableAction}
                toggleTable={this.toggleTable}
                parent={this.floorplanParent}
                openParty={this.openParty}
                serverTables={serverTables}
              />
            )}
          </React.Fragment>
        ) : (
          <FreeFloorPlan
            membership={membership}
            tables={tablesToDisplay}
            selected={selected}
            toggleTable={this.toggleTable}
            openParty={this.openParty}
            serverTables={serverTables}
          />
        )}
      </s.FloorPlanContainer>
    );
  }
}

TablesPage.propTypes = {
  selected: SetType,
  editing: PropTypes.bool,
  role: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool
  }),
  membership: PropTypes.bool,
  tables: PropTypes.arrayOf(PropTypes.object),
  serverTables: PropTypes.arrayOf(PropTypes.number),
  partyList: PropTypes.arrayOf(PropTypes.object),
  getTables: PropTypes.func,
  moveTable: PropTypes.func,
  getParties: PropTypes.func,
  toggleTable: PropTypes.func,
  clearSelected: PropTypes.func,
  clearServerTables: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

TablesPage.defaultProps = {
  selected: new Set(),
  editing: false,
  role: { admin: false, manager: false },
  membership: false,
  tables: [],
  serverTables: [],
  partyList: [{ _id: 'defaultpartyid' }],
  getTables: () => {},
  moveTable: () => {},
  getParties: () => {},
  toggleTable: () => {},
  clearSelected: () => {},
  clearServerTables: () => {},
  history: { push: () => {} },
  match: { params: {} }
};

const mapStateToProps = state => ({
  selected: state.tables.selected,
  tables: state.tables.tableList,
  editing: state.tables.editing,
  role: state.auth.role,
  partyList: state.party.partyList,
  serverTables: state.tables.serverTables,
  membership: state.auth.membership
});

export default connect(
  mapStateToProps,
  { getTables, moveTable, toggleTable, getParties, clearSelected, clearServerTables }
)(TablesPage);
