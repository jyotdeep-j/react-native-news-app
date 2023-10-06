import { Alert, Button, Dimensions, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NEWS_API } from '../constants'
import FastImage from 'react-native-fast-image'
import moment from 'moment'

const { height, width } = Dimensions.get("window")

const News = () => {
    const [newsData, setNewsData] = React.useState<[]>([])


    const fetchNews = () => {
        fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API}`)
            .then((response) => response.json())
            .then((result) => { console.log("result from fetch news", result?.articles), setNewsData(result?.articles) })
            .catch((error) => Alert.alert("Error from fetch news"))
    }

    React.useEffect(() => {
        fetchNews();
    }, [])


    return (
        <View>
            <FlatList
                data={newsData}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListStyle}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.newsView}>
                            {/* <Text>{JSON.stringify(item, null, 2)}</Text> */}
                            <Text style={styles.newsTitle}>{item?.title}</Text>
                            <FastImage
                                style={styles.newsImage}
                                source={{
                                    uri: item?.urlToImage,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                                defaultSource={require('../assets//placeholder.jpg')}
                            />

                            <Text style={styles.newsDesc}>{item?.description}</Text>
                            <Text style={styles.newsDate}>Publish At: {moment(item?.publishedAt).format("LLLL")}</Text>
                            {item?.author && <Text style={styles.newsAuthor}>By: {item?.author}</Text>}

                            <TouchableOpacity onPress={() => Linking.openURL(item?.url)}>
                                <Text style={styles.knowMore}>{"Know More"}</Text>
                            </TouchableOpacity>

                        </View>
                    )
                }}

            />
        </View>
    )
}

export default News

const styles = StyleSheet.create({
    newsView: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 15,
        width: "100%",
        borderRadius: 10,

    },
    newsTitle: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 5
    },
    newsDesc: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 5,
        marginTop: 20,
        color: 'rgba(0,0,0,0.7)'
    },
    newsAuthor: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 5,
        marginTop: 5,
        color: 'rgba(0,0,0,0.7)'
    },
    newsDate: {
        fontSize: 14,
        lineHeight: 22,
        color: 'rgba(0,0,0,0.7)'
    },
    newsImage: {
        height: height * 0.2,
        width: width - 30,
        maxHeight: height * 0.3,
        marginTop: 10
    },
    knowMore: {
        color: '#0d82df',
        fontWeight: '700',
        marginTop: 5,
        fontSize: 16
    },
    flatListStyle: {
        paddingBottom: 50
    }
})