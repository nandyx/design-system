import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';
import { tokens } from '@mds/foundation';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    console.log('token', tokens.colors.primary[500]);
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <p style={{ color: tokens.colors.danger[200].value }}> Hello, World! I'm {this.getText()}</p>;
  }
}
