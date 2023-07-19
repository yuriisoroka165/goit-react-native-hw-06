export const selectAllPosts = state => state.posts.posts;
export const selectCurrentUserPosts = state => {
    return state.posts.posts.filter(
        item => (item.uid = state.authorization.userId)
    );
};
export const selectComments = state => {
    return state.posts.posts.comments.filter(
        item => (item.id = state.posts.posts.id)
    );
};

const pst = [
    {
        lKw3HFlQwpIULsMm: {
            description: "stht",
            geoLocation: [Object],
            img: "https://firebasestorage.googleapis.com/v0/b/react-native-389314.appspot.com/o/1689682812632?alt=media&token=f8b46ccd-a349-40c6-ad76-2f4e7e35c072",
            likes: 0,
            locationName: "rthr",
            userId: "HdsAqt1Bq0YS6w7owMt3k8gHXFv1",
        },
    },
    {
        sFUqZu67VEhG4iqE: {
            description: "eryet",
            geoLocation: [Object],
            img: "https://firebasestorage.googleapis.com/v0/b/react-native-389314.appspot.com/o/1689682790745?alt=media&token=ffedc310-eaa9-473c-96ed-3b8e7e093038",
            likes: 0,
            locationName: "shrth",
            userId: "HdsAqt1Bq0YS6w7owMt3k8gHXFv1",
        },
    },
    {
        sJAXZMVdEav587AV: {
            description: "eryet",
            geoLocation: [Object],
            img: "https://firebasestorage.googleapis.com/v0/b/react-native-389314.appspot.com/o/1689682755046?alt=media&token=bda9fa0f-53ee-421f-b6b5-d67487aec845",
            likes: 0,
            locationName: "shrth",
            userId: "HdsAqt1Bq0YS6w7owMt3k8gHXFv1",
        },
    },
    {
        spXuDleJx3KlDfFc: {
            description: "eryet",
            img: "https://firebasestorage.googleapis.com/v0/b/react-native-389314.appspot.com/o/1689682662514?alt=media&token=3ddf6011-413c-47c6-a3b0-3a8531d499a5",
            locationName: "shrth",
            userId: "HdsAqt1Bq0YS6w7owMt3k8gHXFv1",
        },
    },
];

const pst2 = [
    {
        comments: [[Object], [Object], [Object]],
        description: "123",
        geoLocation: { latitude: 49.2714836, longitude: 23.8227551 },
        img: "https://izki.ua/image/cache/catalog/statti/maxresdefault-335x200w.jpg",
        likes: 50,
        locationName: "Ukraine",
    },
    {
        comments: [],
        description: "456",
        geoLocation: { latitude: 49.2714836, longitude: 23.8227551 },
        img: "https://img.tsn.ua/cached/292/tsn-8c5f6b23d1211bb14030cc3abd4583f7/thumbs/x/bf/74/1d750cdae19c5075e0123ec455ee74bf.jpeg",
        likes: 58,
        locationName: "Ukraine",
    },
    {
        comments: [[Object], [Object], [Object]],
        description: "789",
        geoLocation: { latitude: 49.2714836, longitude: 23.8227551 },
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/%D0%93%D1%80%D0%B0%D0%BC%D0%BF%D0%B8%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B5_%D0%B3%D0%BE%D1%80%D1%8B.jpg/280px-%D0%93%D1%80%D0%B0%D0%BC%D0%BF%D0%B8%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B5_%D0%B3%D0%BE%D1%80%D1%8B.jpg",
        likes: 56,
        locationName: "Ukraine",
    },
    {
        comments: [[Object], [Object], [Object]],
        description: "012",
        geoLocation: { latitude: 49.2714836, longitude: 23.8227551 },
        img: "https://planetofhotels.com/guide/sites/default/files/styles/big_gallery_image/public/text_gallery/gori.jpg",
        likes: 76,
        locationName: "Ukraine",
    },
];
