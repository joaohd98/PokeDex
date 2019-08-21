import React, {Component} from "react";
import {PokedexCard} from "../card/pokedex-card";
import {PokedexCSS} from "../pokedex-css";
import {PokedexInteractor} from "../../../service/pokedex-interactor";
import {Colors} from "../../../../../helpers/colors/colors";
import {images} from "../../../../../assets";
import {PokedexProps} from "../../../service/pokedex-props";
import {Animated, Easing, FlatList, ScrollView, StyleSheet, Text, View} from "react-native";

export class PokedexList extends Component<PokedexProps.Props>{

  private carrregarPokemons = false;
  private RotateValueHolder = new Animated.Value(0);

  componentDidMount = () => {

    this.StartImageRotateFunction();

  };

  /*
   * Skeleton
   */

  renderListSkeleton = () => {

    let cards: Element[] = [];

    for(let i = 0; i <= 5; i++)
        cards.push(<PokedexCard key={i} skeleton={true}/>);

    return (
      <ScrollView scrollEnabled={false}>
        { cards }
      </ScrollView>
    )

  };

  /*
   * Lista Pokemons
   */
  renderList = () => {

    let pokemonsFiltrados = this.props.pokemons.filter(pokemon => pokemon.visivel);

    let tamanho = pokemonsFiltrados.length;
    let pokemons = PokedexInteractor.scrollPokemons(pokemonsFiltrados, this.props.limite);

    return (
      <FlatList
        ref={this.props.flatList}
        data={pokemons}
        style={PokedexCSS.PokedexCard.view}
        keyExtractor={item => item.numero}
        renderItem={iterator  => <PokedexCard pokemon={iterator.item} />}
        onMomentumScrollBegin={() => { this.carrregarPokemons = true; }}
        onEndReached={this.carregarPokemons}
        onEndReachedThreshold={0.01}
        ListEmptyComponent={<PokedexCard/>}
        ListFooterComponent={tamanho >= this.props.limite && tamanho > 0 ? this.infiniteScroll() : <View />}
      />
    )

  };

  StartImageRotateFunction = () => {

    this.RotateValueHolder.setValue(0);

    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
    }).start(this.StartImageRotateFunction);

  };

  infiniteScroll = () => {

    let css = StyleSheet.create({
      view: {
        flex: 1,
        paddingBottom: 55,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontWeight: "400",
        fontSize: 18,
        lineHeight: 50,
        letterSpacing: 0.25,
        color: Colors.gray
      },
      image: {
        width: 40,
        height: 40,
      }
    });

    const rotate = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={css.view}>
        <Animated.Image source={images.pokeball} style={{...css.image, transform: [{rotate}]}} />
        <Text style={css.text}>Carregando Pokémons...</Text>
      </View>
    )

  };

  carregarPokemons = () => {

    if(!this.carrregarPokemons)
      return;

    setTimeout(() => {this.carrregarPokemons = false; this.props.adicionarLimite(); }, 500);

  };

  /*
   * Render
   */

  render = () => {

    return this.props.carregando ? this.renderListSkeleton() : this.renderList();

  };

}