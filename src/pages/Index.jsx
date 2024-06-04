import { useState } from "react";
import { Container, Text, VStack, Box, Image, SimpleGrid, Heading, Button, Input, Select, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

const sampleProducts = [
  {
    id: 1,
    name: "Smartphone",
    description: "Latest model with advanced features",
    price: 699,
    category: "Electronics",
    brand: "Brand A",
    image: "/images/smartphone.jpg"
  },
  {
    id: 2,
    name: "Laptop",
    description: "High performance laptop for professionals",
    price: 999,
    category: "Electronics",
    brand: "Brand B",
    image: "/images/laptop.jpg"
  },
  {
    id: 3,
    name: "Smartwatch",
    description: "Stylish smartwatch with health tracking",
    price: 199,
    category: "Wearables",
    brand: "Brand A",
    image: "/images/smartwatch.jpg"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleBrandChange = (value) => {
    setSelectedBrands(value);
  };

  const filterProducts = (products) => {
    return products.filter(product => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesPriceRange = selectedPriceRange ? (
        selectedPriceRange === "under-500" ? product.price < 500 :
        selectedPriceRange === "500-1000" ? product.price >= 500 && product.price <= 1000 :
        selectedPriceRange === "above-1000" ? product.price > 1000 : true
      ) : true;
      const matchesBrand = selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true;

      return matchesSearchTerm && matchesCategory && matchesPriceRange && matchesBrand;
    });
  };

  const filteredProducts = filterProducts(sampleProducts);
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Welcome to Electronics Store</Heading>
        <Text fontSize="lg">Find the latest and greatest in electronics</Text>
        <Input
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearch}
          size="lg"
          mb={6}
        />
        <Box width="100%" mb={6}>
          <SimpleGrid columns={[1, 2, 3]} spacing={10}>
            <Box>
              <Text fontSize="md" mb={2}>Category</Text>
              <Select placeholder="Select category" onChange={handleCategoryChange}>
                <option value="Electronics">Electronics</option>
                <option value="Wearables">Wearables</option>
              </Select>
            </Box>
            <Box>
              <Text fontSize="md" mb={2}>Price Range</Text>
              <Select placeholder="Select price range" onChange={handlePriceRangeChange}>
                <option value="under-500">Under $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="above-1000">Above $1000</option>
              </Select>
            </Box>
            <Box>
              <Text fontSize="md" mb={2}>Brand</Text>
              <CheckboxGroup onChange={handleBrandChange}>
                <Stack spacing={2}>
                  <Checkbox value="Brand A">Brand A</Checkbox>
                  <Checkbox value="Brand B">Brand B</Checkbox>
                </Stack>
              </CheckboxGroup>
            </Box>
          </SimpleGrid>
        </Box>
          <SimpleGrid columns={[1, 2, 3]} spacing={10} width="100%">
          {filteredProducts.map(product => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
              <Image src={product.image} alt={product.name} boxSize="200px" objectFit="cover" mx="auto" />
              <VStack spacing={4} mt={4}>
                <Heading as="h3" size="md">{product.name}</Heading>
                <Text>{product.description}</Text>
                <Text fontWeight="bold">${product.price}</Text>
                <Button colorScheme="teal">Add to Cart</Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;