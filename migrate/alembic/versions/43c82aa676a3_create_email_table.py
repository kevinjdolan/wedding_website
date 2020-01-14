"""create email table

Revision ID: 43c82aa676a3
Revises:
Create Date: 2020-01-10 12:21:34.425145

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '43c82aa676a3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'email',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('email', sa.String()),
        sa.Column('name', sa.String()),
        sa.Column('date', sa.DateTime()),
    )


def downgrade():
    pass
