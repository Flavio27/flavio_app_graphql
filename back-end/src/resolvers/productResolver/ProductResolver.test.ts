import  faker  from 'faker';
import { main } from "../../";
import { ProductBuilder } from '../../infrastructure/builders/productBuilder';
import { ProductType } from "../../models/Product";
import { jsonParser } from '../../utils/jsonParser';
import { ProductRepository } from './../../repositories/productRepository/productRepository';


describe('ProductResolver', () => {
  
  test('It should get all products', async () => {
    // Arrange
    const server = await main()
    const query = `
    query {
      products {
        id
        code
        barcode
        description
        type
      }
    }
    `
    // Act
    const newProduct = await new ProductBuilder().insert()
    const allProducts = await new ProductRepository().getProducts()
    const { data, errors} = await server.executeOperation({
      query
    }) 

    // Assert
    expect(errors).toBeFalsy()
    expect(data?.products).toEqual(jsonParser(allProducts))
    expect(data?.products).toContainEqual(newProduct)
  })

  test('It should get a product by ID', async () => {
    // Arrange 
    const server = await main()
    const newProduct = await new ProductBuilder().insert()
    
    const query = `
    query {
      productById(id: "${newProduct.id}") {
        id
        code
        barcode
        description
        type
      }
    }
    `
    // Act
    const product = await new ProductRepository().getProductByID(newProduct.id)
    const { data, errors} = await server.executeOperation({
      query
    }) 

    // Assert
    expect(errors).toBeFalsy()
    expect(data?.productById).toEqual(newProduct)
    expect(data?.productById).toEqual(jsonParser(product))
  })

  test('It should get a product by Code', async () => {
    // Arrange 
    const server = await main()
    const newProduct = await new ProductBuilder().insert()
    
    const query = `
    query {
      productByCode(code: "${newProduct.code}") {
        id
        code
        barcode
        description
        type
      }
    }
    `
    // Act
    const product = await new ProductRepository().getProductByCode(newProduct.code)
    const { data, errors } = await server.executeOperation({
      query
    }) 

    // Assert 
    expect(errors).toBeFalsy()
    expect(data?.productByCode).toEqual(newProduct)
    expect(data?.productByCode).toEqual(jsonParser(product))
  })

  test('It should get a products by Barcode', async () => {
    // Arrange 
    const server = await main()
    const newProduct = await new ProductBuilder().insert()
    
    const query = `
    query {
      productByBarcode(barcode: ${newProduct.barcode}) {
        id
        code
        barcode
        description
        type
      }
    }
    `
    // Act
    const products = await new ProductRepository().getProductsByBarcode(newProduct.barcode)
    const { data, errors } = await server.executeOperation({
      query
    }) 

    // Assert 
    expect(errors).toBeFalsy()
    expect(data?.productByBarcode).toEqual(products)
    expect(data?.productByBarcode).toContainEqual(newProduct)
  })

  test('It should get a products by Description', async () => {
    // Arrange 
    const server = await main()
    const newProduct = await new ProductBuilder().insert()
    
    const query = `
    query {
      productByDescription(description: "${newProduct.description}") {
        id
        code
        barcode
        description
        type
      }
    }
    `
    // Act
    const products = await new ProductRepository().getProductsByDescription(newProduct.description)
    const { data, errors } = await server.executeOperation({
      query
    }) 

    // Assert 
    expect(errors).toBeFalsy()
    expect(data?.productByDescription).toEqual(products)
    expect(data?.productByDescription).toContainEqual(newProduct)
  })

  test('It should create a new product', async () => {
    // Arrange 
    const server = await main()

    const newProduct = {
      code: `PROD${faker.datatype.number({
        min: 1,
        max: 99999,
      })}`,
      barcode: faker.datatype.number({
        min: 999999,
        max: 999999999,
      }),
      description: faker.random.words(),
      type: ProductType.UTENSILIOS,
    };

    const query = `
    mutation {
      createProduct(data: {
        code: "${newProduct.code}",
        barcode: ${newProduct.barcode},
        description: "${newProduct.description}",
        type: ${newProduct.type},
      }) {
          id
          barcode
          code
          description
          type
        }
    }
    `

    // Act
    const { data, errors } = await server.executeOperation({
      query
    })
    const product = await new ProductRepository().getProductByCode(newProduct.code)

    // Assert 
    expect(errors).toBeFalsy()
    expect(data?.createProduct).toEqual(product)
  })

  test.each`
  code          | barcode     | description                    | type
  ${"PROD1234"} | ${"abc"}    | ${"DESCRIPTION TEST"}          | ${ProductType.UTENSILIOS}
  ${"PROD1234"} | ${123567}   | ${faker.datatype.string(151)}  | ${ProductType.UTENSILIOS}
  ${"PROD1234"} | ${123567}   | ${"DESCRIPTION TEST"}          | ${"ABC"}
  `('It not should create a new product with wrong data ${{ code, barcode, description, type }}', 
  async ({ code, barcode, description, type }) => {
    // Arrange 
    const server = await main()

    const query = `
    mutation {
      createProduct(data: {
        code: "${code}",
        barcode: ${barcode},
        description: "${description}",
        type: ${type},
      }) {
          id
          barcode
          code
          description
          type
        }
    }
    `

    // Act
    const { data, errors } = await server.executeOperation({
      query
    })

    // Assert 
    expect(data).toBeFalsy()
    expect(errors).toBeTruthy()

  })
})