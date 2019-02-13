import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import LazyLoad from 'react-lazyload';

const styles = theme =>
({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    flexgrow: 1
  },
  gridList: {
    width: '100%'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
});

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      width: 0
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { classes } = this.props;

    const getGridListCols = () => {
      if (this.state.width > 1280) {
        return 3;
      } else if (this.state.width < 1280 && this.state.width >= 960) {
        return 3;
      } else if (this.state.width < 960 && this.state.width >= 600) {
        return 2;
      } else {
        return 1;
      }
    };

    return (
      <div className={classes.root}>
        <GridList
          className={classes.gridList}
          cellHeight={350}
          cols={getGridListCols()}
          spacing={16}
        >
          {this.props.data.map(tile => (
            <GridListTile key={tile.id}>
            <LazyLoad>
              <a href={tile.url}><img width={'100%'} height={'100%'} src={tile.url} alt={tile.title} /></a>
              <GridListTileBar title={tile.title}/>
            </LazyLoad>
            </GridListTile>
          )) }
        </GridList>
      </div>
    );
  }
}

Gallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
     albumId: PropTypes.number,
     id: PropTypes.number,
     title: PropTypes.string,
     url: PropTypes.string,
     thumbnailUrl: PropTypes.string,
   }))
}

export default withStyles(styles)(Gallery);
