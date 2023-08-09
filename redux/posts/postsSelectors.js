export const selectAllPosts = state => state.posts.posts;
export const selectIsLoading = state => state.posts.isLoading;

export const selectComments = (state, id) => {
    const comments = state.posts.posts.filter(item => item[id]);
    return comments[0][id].comments;
};

export const selectCommentatorsPhoto = (state, id) => {
    const avatar = state.posts.commentatorsPhoto.find(
        avatar => avatar.uid === id
    );
    return avatar.url;
};
