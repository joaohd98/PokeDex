import React from "react";
import {Component} from "react";
import {Text, View} from "react-native";
import {PokedexInput} from "./components/input/pokedex-input";
import {PokedexProps} from "./redux/pokedexReducer";
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {PokedexAction} from "./redux/pokedexAction";
import {PokedexHeader} from "./components/header/header";
import {PokedexCSS} from "./pokedex-css";
import {PokedexList} from "./components/list/pokedex-list";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

interface Props extends PokedexProps{
  carregarPokemons: () => {}
}

class PokedexPage extends Component<Props> {

  static navigationOptions = PokedexHeader.Header;

  componentDidMount() {

    this.props.carregarPokemons()

  }

  mostrarErro() {

    let css = PokedexCSS.MOSTRAR_MENSAGEM;

    return (
      <View style={css.view}>
        <Text style={css.titulo}>Ooops! Aconteceu algo</Text>
      </View>
    )

  };

  mostrarPokemons() {

    let props = this.props;

    return (
      <View>
        <PokedexInput />
        <PokedexList pokemons={props.pokemons} carregando={props.carregando} />
      </View>
    )

  }

  render() {

    let props = this.props;

    return (
      <View>
        { props.erro ? this.mostrarErro() : this.mostrarPokemons() }
      </View>
    )

  }

}

const mapStateToProps = (state) => {
  return state.pokedexReducer
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    carregarPokemons: PokedexAction.carregarPokemons
  }, dispatch)
);

export const Pokedex = connect(mapStateToProps, mapDispatchToProps)(PokedexPage);
