import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Container } from "@/shared/ui/container";
import { Flex } from "@/shared/ui/flex";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { AlertCircle } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Container>
        <Heading>I am heading</Heading>

        <Text variant="muted">Hello, I am text</Text>

        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Heads Up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>

        <Flex direction="row" gap="2" wrap="wrap" justify="between">
          <Card className="max-w-full lg:max-w-[32%] xl:max-w-[24%] w-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>

          <Card className="max-w-full lg:max-w-[32%] xl:max-w-[24%] w-full gap">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>

          <Card className="max-w-full lg:max-w-[32%] xl:max-w-[24%] w-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>

          <Card className="max-w-full lg:max-w-[32%] xl:max-w-[24%] w-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </Flex>
      </Container>
    </main>
  );
}
