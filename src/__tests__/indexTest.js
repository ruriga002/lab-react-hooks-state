import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'
import { sampleProducts } from '../data'
import '@testing-library/jest-dom'

test('toggles dark mode on button click', () => {
  render(<App />)

  const toggleBtn = screen.getByRole('button', { name: /toggle/i })
  expect(toggleBtn).toBeInTheDocument()

  fireEvent.click(toggleBtn)
  expect(toggleBtn.textContent.toLowerCase()).toMatch(/light/i)

  fireEvent.click(toggleBtn)
  expect(toggleBtn.textContent.toLowerCase()).toMatch(/dark/i)
})

test('filters products by category', () => {
  render(<App />)

  const dropdown = screen.getByRole('combobox')

  fireEvent.change(dropdown, { target: { value: 'Fruits' } })

  expect(screen.getByText(/apple/i)).toBeInTheDocument()
  expect(screen.queryByText(/milk/i)).not.toBeInTheDocument()
})

test('displays message when no products match filter', () => {
  render(<App />)

  const dropdown = screen.getByRole('combobox')

  fireEvent.change(dropdown, { target: { value: 'NonExistent' } })

  expect(screen.getByText(/no products available/i)).toBeInTheDocument()
})

test('adds items to cart', () => {
  render(<App />)

  //  Safely get products instead of risking .find() crash
  const apple = sampleProducts.find(p => p.name === 'Apple')
  const milk = sampleProducts.find(p => p.name === 'Milk')

  // 🔒 Safety checks (prevents undefined crash)
  expect(apple).toBeDefined()
  expect(milk).toBeDefined()

  // Click Apple
  const appleBtn = screen.getByTestId(`product-${apple.id}`)
  fireEvent.click(appleBtn)

  expect(screen.getByText(/shopping cart/i)).toBeInTheDocument()
  expect(screen.getByText(/Apple is in your cart/i)).toBeInTheDocument()

  // Click Milk
  const milkBtn = screen.getByTestId(`product-${milk.id}`)
  fireEvent.click(milkBtn)

  expect(screen.getByText(/Milk is in your cart/i)).toBeInTheDocument()
})