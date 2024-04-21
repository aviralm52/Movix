//TODO : IMPORTED FROM MATERIAL UI
import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import avatar from "../../assets/avatar.png"
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({review}) {
    console.log('review: ', review);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const [liked, setLiked] = useState('gray');
    const {url} = useSelector((store) => store.home)
    const profile = review?.author_details?.avatar_path ? (url.avatar + review?.author_details?.avatar_path) : avatar
    
    return (
        <Card sx={{ maxWidth: 450 }} className="mx-auto my-8" style={{borderRadius: '10px', backgroundColor: '#041226', color: 'white', border: '1px solid white'}}>
            <CardHeader 
                avatar={
                    <Avatar aria-label="recipe">
                        <img src={profile} alt="" />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={review?.author ? review?.author : 'John Doe'}
                subheader={dayjs(review?.created_at).format('MMM D, YYYY')}
            />
            <p className="text-sm relative left-[73px] -top-8">{dayjs(review?.created_at).format('MMM D, YYYY')}</p>
            {/* <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
            /> */}
            <CardContent className=" -mt-4">
                <Typography variant="body2" color="text-white" >
                    {review?.content.slice(0,240) + '...'}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" style={{color: liked}} onClick={() => {liked === 'gray' ? setLiked('red') : setLiked('gray')}}>
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" style={{color: 'white'}} onClick={() => {
                    navigator.clipboard.writeText(review?.url);
                }}>
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    style={{color: 'white'}}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph className="text-slate-600">Full Review:</Typography>
                    {/* <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add
                        saffron and set aside for 10 minutes.
                    </Typography> */}
                    <Typography paragraph style={{color: 'white'}}>
                        {review?.content}
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with
                        artichokes and peppers, and cook without stirring, until
                        most of the liquid is absorbed, 15 to 18 minutes. Reduce
                        heat to medium-low, add reserved shrimp and mussels,
                        tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just
                        tender, 5 to 7 minutes more. (Discard any mussels that
                        don&apos;t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes,
                        and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
