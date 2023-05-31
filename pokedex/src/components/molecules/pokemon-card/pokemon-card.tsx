import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import Link from 'next/link';
import styles from "./pokemon-card.module.css";

export interface PokemonCardProps {
    title: string;
    imageSrc: string;
    type: string;
    number: string;
    backgroundSrc: string;
}

export default function PokemonCard(props: PokemonCardProps) {
    return (
        <Link href="/pokemon">
            <Card className={styles.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={styles.image}
                        image={props.imageSrc}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.number}
                        </Typography>
                        <CardMedia
                        component="img"
                        className={styles.image}
                        image={props.backgroundSrc}
                        alt="background"
                    />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}
