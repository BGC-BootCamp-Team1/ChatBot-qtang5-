describe('My First Test', () => {
  it('Visits the AI Generation page and generates content', () => {
    // 访问初始项目页面
    cy.visit('/');

// 输入框输入内容并按下回车
cy.get('input[matInput]').type('测试输入内容{enter}');

// 验证加载动画是否显示
cy.get('mat-progress-spinner').should('be.visible');

// 等待加载动画消失
cy.get('mat-progress-spinner').should('not.exist');

// 验证卡片内容是否更新
cy.get('app-card mat-card-content p').should('contain', '测试输入内容的响应'); // 根据实际返回内容进行验证

  });
});