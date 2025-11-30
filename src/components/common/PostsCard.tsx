import { Eye, Heart, ThumbsDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/shadcn-components/ui/card";
import { Badge } from "@/components/shadcn-components/ui/badge";

const PostsCard: React.FC<{
  title: string;
  body: string;
  blogIMG: string;
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  tags: string[];
}> = ({ title, blogIMG, body, reactions, views, tags }) => {
  return (
    <Card className="max-w-[345px] border-none overflow-hidden shadow-sm duration-300 flex flex-col h-full justify-start py-0 pb-6">
      <div className="aspect-video overflow-hidden">
        <img
          src={blogIMG}
          alt="blog img"
          className="w-full h-full object-cover "
        />
      </div>

      <CardContent className="space-y-2 flex-1">
        <h3 className="font-semibold text-xl leading-tight line-clamp-2">
          {title}
        </h3>

        <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
          {body}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span>{reactions.likes}</span>
            </div>

            <div className="flex items-center gap-1">
              <ThumbsDown className="w-4 h-4 text-gray-500" />
              <span>{reactions.dislikes}</span>
            </div>

            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-blue-500" />
              <span>{views}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostsCard;
