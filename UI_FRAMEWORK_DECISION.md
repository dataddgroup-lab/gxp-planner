# Universal GxP Facility Planner
## UI Framework Decision: Ant Design Enterprise (Battle-Tested)

**Status:** LOCKED IN  
**Decision Date:** March 11, 2026, 9:59 AM MDT  
**Owner:** Systems Architect, Frontend Lead  
**Purpose:** Prevent RanchOS trap ("little fix, little break" cycle)  

---

## The Problem (RanchOS Lessons Learned)

**RanchOS spent weeks fiddling with UI components:**
- ❌ shadcn/ui forms had inconsistent behavior
- ❌ Custom tweaks to components broke other things
- ❌ "Little fix" cycle: fix one thing, break another
- ❌ Hours spent debugging component interactions
- ❌ Timeline slipped due to UI complexity
- ❌ Result: months of frustration for small visual wins

**Root cause:** Using lightweight component libraries (shadcn) that require customization for enterprise use cases.

---

## The Solution: Ant Design Enterprise

**Use a framework that ALREADY WORKS for enterprise apps.**

### Why Ant Design?

**Proven at scale:**
- ✅ 1000s of production deployments
- ✅ Used by Fortune 500 companies (Alibaba, Microsoft, Adobe, Google)
- ✅ 10+ years of real-world usage
- ✅ Battle-tested in complex enterprise apps

**Form components are SOLID:**
- ✅ Input, Select, Date, Checkbox, Radio, TextArea all working perfectly
- ✅ Form validation built-in (no custom logic needed)
- ✅ Multi-field forms work out of the box
- ✅ Conditional field hiding/showing works
- ✅ Dynamic field arrays work (add/remove fields)
- ✅ Form reset, populate, validation all built-in
- ✅ No "little fixes" needed

**Data presentation is SOLID:**
- ✅ Table component handles sorting, filtering, pagination
- ✅ No custom table logic needed
- ✅ Column resizing works
- ✅ Row selection works
- ✅ Expandable rows work
- ✅ Pagination works
- ✅ Inline editing works

**Dashboards are SOLID:**
- ✅ Card component (consistent styling)
- ✅ Statistic component (KPIs with numbers/icons)
- ✅ Row/Col layout (grid system)
- ✅ Progress bars, gauges, charts all work
- ✅ Responsive by default (no breakpoint fiddling)

**Enterprise features:**
- ✅ Modal/drawer (no positioning bugs)
- ✅ Dropdown/menu (click-outside handling works)
- ✅ Tooltip/popover (no z-index wars)
- ✅ Tree component (nested hierarchies)
- ✅ Tabs/accordion (state management built-in)
- ✅ Steps/timeline (workflow visualization)

**Accessibility:**
- ✅ WCAG 2.1 AA compliant (verified by Ant Design team)
- ✅ Keyboard navigation works
- ✅ Screen reader compatible
- ✅ Color contrast verified
- ✅ No accessibility fiddling needed

**TypeScript support:**
- ✅ Full type definitions
- ✅ Strict mode compatible
- ✅ No `any` types needed
- ✅ Component props fully typed

---

## What We DO Use (Ant Design As-Is)

```typescript
// Use Ant Design components exactly as documented

import { Form, Input, Button, Select, Table, Card } from 'antd';

// Form example (no custom tweaks)
<Form form={form} onFinish={onFinish}>
  <Form.Item name="equipment_type" rules={[{ required: true }]}>
    <Select placeholder="Select equipment" />
  </Form.Item>
</Form>

// Table example (no custom table logic)
<Table 
  columns={columns} 
  dataSource={data} 
  pagination={{ pageSize: 20 }}
/>

// Dashboard example (no custom cards)
<Card title="Readiness Status">
  <Statistic value={65} suffix="%" />
</Card>
```

---

## What We DON'T Do (No Customization)

```typescript
// ❌ DO NOT do this:

// Custom form behavior
<Form>
  <CustomFormField value={value} onChange={handleChange} />
</Form>

// Custom table implementation
<div className="custom-table">
  {data.map(row => <CustomRow row={row} />)}
</div>

// Custom button styling
<button className="custom-btn" onClick={() => {...}}>
  Custom Button
</button>

// Custom modal positioning
<div className="custom-modal" style={{ top: '100px', left: '50px' }}>
  Custom Modal
</div>

// Instead: Use Ant Design Button, Modal, etc.
// If styling doesn't match: Update theme colors, don't customize components
```

---

## Customization (Allowed, Limited)

**ALLOWED: Theme-level customization**
- Colors (primary, error, warning, success)
- Spacing (padding, margins)
- Fonts (family, size, weight)
- Border radius
- Box shadow

**NOT ALLOWED: Component behavior customization**
- Don't modify Form component behavior
- Don't modify Table sorting/filtering
- Don't modify Modal positioning
- Don't modify Select dropdown styling
- Don't create "improved" versions of Ant components

**Rule:** If you want different behavior, file issue in Ant Design repo. Don't build custom version.

---

## Theming (Ant Design)

```typescript
// Theme customization ONLY at token level

import { ConfigProvider, theme } from 'antd';

<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff', // GxP Planner brand color
      borderRadius: 4,
      fontFamily: 'Inter, sans-serif',
    },
    algorithm: theme.darkAlgorithm, // or lightAlgorithm
  }}
>
  <App />
</ConfigProvider>

// That's it. Don't customize component styles beyond tokens.
```

---

## Layout & Grid

**Use Ant Design Grid:**
```typescript
import { Row, Col } from 'antd';

<Row gutter={16}>
  <Col span={12}>
    <Card>...</Card>
  </Col>
  <Col span={12}>
    <Card>...</Card>
  </Col>
</Row>

// Responsive:
<Col xs={24} sm={12} md={8} lg={6} xl={6}>
  {/* Auto-resizes based on screen size */}
</Col>
```

**NOT:** Custom CSS Grid or Flexbox for layout.

---

## Forms (Ant Design Form)

**Use Ant Design Form:**
```typescript
import { Form, Input, Select, Button } from 'antd';

const [form] = Form.useForm();

<Form form={form} onFinish={onFinish}>
  <Form.Item 
    name="equipment" 
    label="Equipment Type"
    rules={[{ required: true, message: 'Required' }]}
  >
    <Select options={equipmentOptions} />
  </Form.Item>
  
  <Form.Item>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>

// Form handles: validation, state, error messages, submission
// Don't build custom form logic
```

---

## Tables (Ant Design Table)

**Use Ant Design Table:**
```typescript
import { Table } from 'antd';

<Table
  columns={[
    { 
      title: 'Equipment', 
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      sorter: (a, b) => a.cost - b.cost,
    }
  ]}
  dataSource={equipment}
  pagination={{ pageSize: 20, showTotal: true }}
  loading={isLoading}
  rowKey="id"
/>

// Table handles: sorting, pagination, loading state
// Don't build custom table
```

---

## Modals (Ant Design Modal)

**Use Ant Design Modal:**
```typescript
import { Modal, Form, Input } from 'antd';

<Modal
  title="Add Equipment"
  open={isOpen}
  onOk={handleSubmit}
  onCancel={handleCancel}
  okText="Add"
  cancelText="Cancel"
>
  <Form form={form}>
    <Form.Item name="name" label="Equipment Name">
      <Input />
    </Form.Item>
  </Form>
</Modal>

// Modal handles: positioning, backdrop, focus management
// Don't build custom modal
```

---

## Dashboards (Ant Design Cards + Statistic)

**Use Ant Design Card + Statistic:**
```typescript
import { Card, Statistic, Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

<Row gutter={16}>
  <Col xs={24} sm={12} md={6}>
    <Card>
      <Statistic 
        title="Tests Passing" 
        value={847}
        suffix="/ 847"
        prefix={<CheckCircleOutlined />}
        valueStyle={{ color: '#52c41a' }}
      />
    </Card>
  </Col>
  
  <Col xs={24} sm={12} md={6}>
    <Card>
      <Statistic 
        title="Code Coverage" 
        value={88}
        suffix="%"
        valueStyle={{ color: '#1890ff' }}
      />
    </Card>
  </Col>
</Row>

// Cards handle: consistent styling, shadow, padding
// Statistic handles: number formatting, layout
// Don't build custom dashboard cards
```

---

## Icons (Ant Design Icons)

**Use Ant Design Icons:**
```typescript
import { 
  CheckCircleOutlined,
  ExclamationOutlined,
  CloseOutlined,
  LoadingOutlined
} from '@ant-design/icons';

<CheckCircleOutlined style={{ color: 'green', fontSize: 24 }} />
<LoadingOutlined />

// Use Ant Icons, not custom SVGs or emoji
```

---

## Navigation (Ant Design Menu)

**Use Ant Design Menu:**
```typescript
import { Menu } from 'antd';
import { HomeOutlined, ToolOutlined } from '@ant-design/icons';

<Menu
  items={[
    { key: 'home', icon: <HomeOutlined />, label: 'Dashboard' },
    { key: 'facility', icon: <ToolOutlined />, label: 'Facility Setup' },
  ]}
  onClick={(e) => navigate(e.key)}
/>

// Menu handles: active state, click handling, styling
// Don't build custom navigation
```

---

## Acceptance Criteria (Phase 2d)

- [ ] All UI built with Ant Design components
- [ ] Zero custom component implementations
- [ ] All forms use Ant Form (no custom form logic)
- [ ] All tables use Ant Table (no custom table logic)
- [ ] All modals use Ant Modal (no custom positioning)
- [ ] Theme customization at token level only (colors, spacing, fonts)
- [ ] Responsive design working (Ant Grid, responsive columns)
- [ ] TypeScript strict mode (all components typed)
- [ ] No "little fix, little break" cycle (use framework as-is)

---

## Success Metric

**Goal:** Zero time spent fiddling with component behavior.

**Target:** 
- Forms work first time, no adjustments
- Tables sort/filter/paginate correctly
- Modals appear without positioning bugs
- Dashboards look consistent
- Responsive works automatically

**Reality check:** If you're spending hours on UI tweaks, something went wrong. Use framework, don't customize it.

---

## Why This Matters

**RanchOS trap:** shadcn + custom tweaks = weeks of fiddling  
**GxP Planner approach:** Ant Design as-is = fast, reliable, proven

**The difference:**
- RanchOS: "Form behaves weird, let's customize it" → breaks something else → 2-day cycle
- GxP Planner: "Form behaves exactly as documented" → move on to next feature → 1-day delivery

**Timeline impact:**
- RanchOS lost 4–6 weeks to UI fiddling
- GxP Planner prevents this by using battle-tested framework

---

## Decision: LOCKED IN

✅ **Ant Design Enterprise for all UI components**  
✅ **Use as-is, NO custom component behavior**  
✅ **Theme customization only (colors, spacing, fonts)**  
✅ **Zero time on "little fix, little break" cycles**  
✅ **Fast, reliable, proven delivery**  

---

**This is non-negotiable. Prevents RanchOS trap. Saves timeline.**
