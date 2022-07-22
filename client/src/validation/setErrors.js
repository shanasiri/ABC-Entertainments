export const setErrors = (title, artist, genre, releaseDate) => {
    let errors = {};

    errors.title = title ? "" : "Title is required";
    errors.artist = artist ? "" : "Artist is required";
    errors.genre = genre ? "" : "Genre is required";
    errors.releaseDate = releaseDate ? "" : "Release Date is required";

    return errors;
}