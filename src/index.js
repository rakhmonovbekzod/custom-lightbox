import React, { Component } from 'react'
import styles from './styles.css'

export default class ExampleComponent extends Component {
  // intial state 
  state = {
    length: 0,
    lightroomactive: false,
    activeindex: 0,
    path: '',
    desc: '',
    sub: ''
  }
  // varibles to store props
  size = 4
  mode = 'light'
  componentDidMount() {
    this.setState({
      length: this.props.images.length,
    })
  }
  // controlling lightbox activation
  openlightroom = (e) => {
    this.setState({
      lightroomactive: true
    })
    this.getcontent(e.target.getAttribute('data-index'))
  }

  closelightroom = () => {
    this.setState({
      lightroomactive: false
    })
  }
  //lightbox controls
  moveright = () => {
    var id = parseInt(this.state.activeindex, 10)
    if (id == this.state.length - 1)
      this.setState({
        lightroomactive: false
      })
    else
      this.getcontent(++id)
  }
  moveleft = () => {
    var id = parseInt(this.state.activeindex, 10)
    if (id == 0)
      this.setState({
        lightroomactive: false
      })
    else
      this.getcontent(--id)
  }
  getcontent = (id) => {
    this.setState(
      {
        activeindex: id,
        path: this.props.images[id].src,
        sub: this.props.images[id].sub,
        desc: this.props.images[id].desc
      }
    )
  }

  calculateStyles = () => {
    var columncount = 4,
      lightroomBackground = 'rgba(255,255,255,0.95)',
      textColor = '#000'
    if (this.props.settings) {
      if (this.props.settings.columnCount) {
        if (window.outerWidth <= 600)
          columncount = this.props.settings.columnCount.mobile ? this.props.settings.columnCount.mobile : 2
        else if (window.outerWidth <= 800)
          columncount = this.props.settings.columnCount.tab ? this.props.settings.columnCount.tab : 3
        else
          columncount = this.props.settings.columnCount.default ? this.props.settings.columnCount.default : 5
      }
      lightroomBackground=this.props.settings.mode == 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.95)'
      textColor=this.props.settings.mode == 'light' ?'#000' : '#fff'
    }
        return {
          row: {
            columnCount: columncount
          },
          lightroom: {
            backgroundColor:lightroomBackground,
            color:textColor
          }
        }
    }
  
  render() {
    const runtimeStyles = this.calculateStyles()
    document.onkeydown = (e) => {
      if (e.keyCode === 39)
        this.moveright()
      if (e.keyCode === 37)
        this.moveleft()
    }
    return (
      <div>

        <div className={styles.row} style={runtimeStyles.row}>

          {this.props.images.map((img, i) =>
            <div className={styles.column} >
              <img data-index={i} src={img.src} key={i} onClick={this.openlightroom} />
            </div>
          )}

        </div>

        <div className={styles.lightroom} style={{
          display: this.state.lightroomactive ? 'block' : 'none',
          ...runtimeStyles.lightroom
        }} >


          <img className={styles.closebutton} src={require('./img/closebutton.svg')} onClick={this.closelightroom} />
          <div className={styles.lightroomcontent} >
            <img className={styles.lightroomimg} src={this.state.path} style={{ maxWidth: "100%" }} />
          </div>
          <div className={styles.lightroomdesc}>
            <h1>{this.state.name}</h1>
            <p className={styles.desc}>{this.state.desc}</p>
            <p className={styles.sub}>{this.state.sub}</p>
          </div>

          <a className={styles.carouselcontrolprev} role="button" tabindex="0" onClick={this.moveleft}>
            <img src={require('./img/left.svg')} />
          </a>
          <a class={styles.carouselcontrolnext} role="button" tabindex="0" onClick={this.moveright}>
            <img src={require('./img/right.svg')} />
          </a>
        </div>

      </div>

    )
  }
}
