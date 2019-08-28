import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {DetalhesCSS} from "../detalhes-css";
import {DetalhesModel} from "../../services/detalhes-model";

export class DetalhesHeader extends Component<DetalhesModel.ViewModel> {

  private css = DetalhesCSS.header;

  render() {

    return (
      <View style={this.css.view}>
        <TouchableOpacity>
          <View style={this.css.subView}>
            <View style={[this.css.border, this.css.borderLeft ]} />
            <View style={[this.css.content, this.css.contentLeft]} >
              <View style={{flex: 0.3}}>
                <Text style={this.css.textLeft}>
                  <Icon name="chevron-circle-left" style={this.css.icon}/>
                </Text>
              </View>
              <View style={{flex: 0.7}}>
                <Text style={[this.css.text, this.css.textLeft]}>Nº {this.props.numeroAnt.numero}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={this.css.subView}>
            <View style={[this.css.content, this.css.contentRight]}>
              <View style={{flex: 0.7}}>
                <Text style={[this.css.text, this.css.textRight]}>Nº {this.props.numeroAdj.numero}</Text>
              </View>
              <View style={{flex: 0.3}}>
                <Text style={this.css.textRight}>
                  <Icon name="chevron-circle-right" style={this.css.icon}/>
                </Text>
              </View>
            </View>
            <View style={[this.css.border, this.css.borderRight ]}/>
          </View>
        </TouchableOpacity>
      </View>
    )

  }

}
