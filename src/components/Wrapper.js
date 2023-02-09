import { Box } from "@chakra-ui/react";

export const Wrapper = ({ children, ...props }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" h="100vh" {...props}>
            {children}
        </Box>
    );
};